var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform mat4 u_matrix;
    void main() {
       gl_Position = u_matrix*a_Position;
    }
`;

var FSHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

var ANGLE_SPEED = 45;

function main() {
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        return;
    }

    var n = initVertexBuffers(gl);

    var u_matrix = gl.getUniformLocation(gl.program, 'u_matrix');

    var currentAngle = 0.0;
    var modelMatrix = new Matrix4();

    var tick = function() {
        currentAngle = animate(currentAngle);
        draw(gl, currentAngle, n, modelMatrix, u_matrix);
        requestAnimationFrame(tick);
    };
    tick();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);

    var n = 3;

    // 创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    // 绑定目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    // 将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    // 开启
    gl.enableVertexAttribArray(a_Position);

    return n;
}

function draw(gl, angle, n, modelMatrix, u_modelMatrix) {
    modelMatrix.setRotate(angle, 0, 0, 1);
    
    gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

var g_last = Date.now();
function animate(angle) {
    var now = Date.now();
    var elapsed = now - g_last;
    g_last = now;

    var newAngle = angle + (ANGLE_SPEED * elapsed);
    return newAngle % 360;
}