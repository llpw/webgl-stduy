var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = a_PointSize;
    }
`;

var FSHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

function main() {
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);

    if (!gl) return;

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) return;
    
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    canvas.onmousedown = function(ev) {
        click(ev, gl, canvas, a_Position)
    }

    
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    
    if (a_Position<0) {
        return;
    }

   // gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    gl.vertexAttrib1f(a_PointSize, 10.0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // gl.drawArrays(gl.POINTS, 0, 1);
}

var g_points = [];

function click(ev, gl, canvas, a_Position) {
    var x = ev.clientX;
    var y = ev.clientY;
    x = (x - canvas.width/2) / (canvas.width/2);
    y = -(y-canvas.height/2) / (canvas.height/2);

    g_points.push(x), g_points.push(y);
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (let i=0; i<g_points.length; i+=2) {
        gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}