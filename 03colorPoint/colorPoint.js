var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = 10.0;
    }
`;

var FSHADER_SOURCE = `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
        gl_FragColor = u_FragColor;
    }
`;

function main() {
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);

    if (!gl) return;

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) return;
    
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    canvas.onmousedown = function(ev) {
        click(ev, gl, canvas, a_Position, u_FragColor)
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_points = [];
var g_colors = [];

function click(ev, gl, canvas, a_Position, u_FragColor) {
    var x = ev.clientX;
    var y = ev.clientY;
    x = (x - canvas.width/2) / (canvas.width/2);
    y = -(y-canvas.height/2) / (canvas.height/2);

    if (x>=0 && y>=0) {
        g_colors.push([1.0, 0.0, 0.0, 1.0]);
    } else if (x<0 && y>=0) {
        g_colors.push([0.0, 1.0, 0.0, 1.0]);
    } else if (x<0 && y<0) {
        g_colors.push([0.0, 0.0, 1.0, 1.0]);
    } else if (x>0 && y<0) {
        g_colors.push([0.0, 1.0, 1.0, 1.0]);
    }

    g_points.push([x, y]);
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (let i=0; i<g_points.length; i+=1) {
        gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0);
        gl.uniform4f(u_FragColor, g_colors[i][0], g_colors[i][1], g_colors[i][2], g_colors[i][3]);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}