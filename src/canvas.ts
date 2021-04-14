/**
 * convenience function to draw a line between 2 points
 *
 * @param ctx canvas context to draw on
 * @param x1 x coordinate of starting point
 * @param y1 y coordinate of starting point
 * @param x2 x coordinate of ending point
 * @param y2 y coordinate of ending point
 */
export const drawLine = (
	ctx: CanvasRenderingContext2D,
	x1: number,
	y1: number,
	x2: number,
	y2: number
) => {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
};
