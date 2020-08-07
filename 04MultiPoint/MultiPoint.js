var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
        //gl_PointSize = 10.0;
    }
`;

var FSHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

function main() {
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas, true);

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) return;

    var n = initVertexBuffers(gl);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //gl.drawArrays(gl.LINES, 0, n);
    //gl.drawArrays(gl.LINE_LOOP, 0, n);
    //gl.drawArrays(gl.LINE_STRIP, 0, n);
    gl.drawArrays(gl.LINE_LOOP, 0, n);
    //gl.drawArrays(gl.LINE_LOOP, 0, n);
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



