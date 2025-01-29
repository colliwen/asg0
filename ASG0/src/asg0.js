// asg0.js
function main() {
    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
    return;
    }

    // Get the rendering context for 2DCG <- (2)
    var ctx = canvas.getContext('2d');

    // Draw a blue rectangle <- (3)
    //ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // Set a blue color
    //ctx.fillRect(120, 10, 150, 150); // Fill a rectangle with the color
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);    

    //Draw red vector
    //var v1 = new Vector3([2.25, 2.25, 0]);
    //drawVector(ctx, v1, "red");
} 

function drawVector(ctx, v, color) {
    var scale = 20; // Scale vector for visualization
    var originX = 200; // Center X (canvas is 400x400)
    var originY = 200; // Center Y (canvas is 400x400)
    var endX = originX + v.elements[0] * scale;
    var endY = originY - v.elements[1] * scale; // Y-axis inverted in canvas

    // Draw the vector
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(originX, originY); // Start at the center
    ctx.lineTo(endX, endY); // Draw to the vector's endpoint
    ctx.stroke();
}

function handleDrawEvent() {
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2D
    var ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Read the values from the input boxes
    var x = parseFloat(document.getElementById('xCoord').value);
    var y = parseFloat(document.getElementById('yCoord').value);

    var x2 = parseFloat(document.getElementById('xCoord2').value);
    var y2 = parseFloat(document.getElementById('yCoord2').value);

    // Create v1 vector
    var v1 = new Vector3([x, y, 0]);
    var v2 = new Vector3([x2, y2, 0]);

    // Draw the vector
    drawVector(ctx, v1, "red");
    drawVector(ctx, v2, "blue");
}

function angleBetween(v1, v2) {
    const dotProduct = Vector3.dot(v1, v2);
    const magnitudeV1 = v1.magnitude();
    const magnitudeV2 = v2.magnitude();

    if (magnitudeV1 === 0 || magnitudeV2 === 0) {
        throw new Error("Cannot calculate the angle with a zero vector");
    }

    // Calculate the angle in radians and convert to degrees
    const cosTheta = dotProduct / (magnitudeV1 * magnitudeV2);
    const angleInRadians = Math.acos(Math.min(Math.max(cosTheta, -1), 1)); // Clamp to [-1, 1] to avoid numerical issues
    return (angleInRadians * 180) / Math.PI; // Convert to degrees
}

function areaTriangle(v1, v2) {
    const crossProduct = Vector3.cross(v1, v2);
    return 0.5 * crossProduct.magnitude();
}

function handleDrawOperationEvent() {
    // Retrieve canvas and context
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    var ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clear the output div
    var outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    // Read inputs for v1 and v2
    var v1 = new Vector3([
        parseFloat(document.getElementById('xCoord').value),
        parseFloat(document.getElementById('yCoord').value),
        0
    ]);

    var v2 = new Vector3([
        parseFloat(document.getElementById('xCoord2').value),
        parseFloat(document.getElementById('yCoord2').value),
        0
    ]);

    // Draw v1 (red) and v2 (blue)
    drawVector(ctx, v1, "red");
    drawVector(ctx, v2, "blue");

    // Read selected operation
    var operation = document.getElementById('operation').value;
    var scalar = parseFloat(document.getElementById('scalar').value);

    try {
        if (operation === "area") {
            const area = areaTriangle(v1, v2);
            console.log(`Area of the triangle: ${area.toFixed(2)}`);
        }
        else if (operation === "angleBetween") {
            const angle = angleBetween(v1, v2);
            console.log(`Angle: ${angle.toFixed(2)} degrees`);
        }
        else if (operation === "magnitude") {
            let v1Mag = v1.magnitude();
            let v2Mag = v2.magnitude();
            console.log(`Magnitude v1: ${v1.magnitude()}`);
            console.log(`Magnitude of v2: ${v2.magnitude()}`);
        } else if (operation === "normalize") {
            let v1Normalized = new Vector3(v1.elements).normalize();
            let v2Normalized = new Vector3(v2.elements).normalize();
            drawVector(ctx, v1Normalized, "green");
            drawVector(ctx, v2Normalized, "green");
        } else if (operation === "add") {
            let v3 = new Vector3(v1.elements).add(v2);
            drawVector(ctx, v3, "green");
        } else if (operation === "sub") {
            let v3 = new Vector3(v1.elements).sub(v2);
            drawVector(ctx, v3, "green");
        } else if (operation === "mul") {
            let v3 = new Vector3(v1.elements).mul(scalar);
            let v4 = new Vector3(v2.elements).mul(scalar);
            drawVector(ctx, v3, "green");
            drawVector(ctx, v4, "green");
        } else if (operation === "div") {
            if (scalar === 0) throw new Error("Division by zero");
            let v3 = new Vector3(v1.elements).div(scalar);
            let v4 = new Vector3(v2.elements).div(scalar);
            drawVector(ctx, v3, "green");
            drawVector(ctx, v4, "green");
        }
    } catch (err) {
        outputDiv.innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
    }
}

