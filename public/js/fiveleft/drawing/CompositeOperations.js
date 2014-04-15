
var GCO = GlobalCompositeOperations = [

	// 0) Default. Displays the source image over the destination image
	"source-over"	
	
	// 1) Displays the source image on top of the destination image. 
	//   The part of the source image that is outside the destination image is not shown
	,"source-atop"	
	
	// 2) Displays the source image in to the destination image. 
	//    Only the part of the source image that is INSIDE the destination image is shown, 
	//    and the destination image is transparent
	,"source-in"		
	
	// 3) Displays the source image out of the destination image. 
	//    Only the part of the source image that is OUTSIDE the destination image is shown, 
	//    and the destination image is transparent
	,"source-out"	
	
	// 4) Displays the destination image over the source image
	,"destination-over"	
	
	// 5) Displays the destination image on top of the source image. 
	//   The part of the destination image that is outside the source image is not shown
	,"destination-atop"	
	
	// 6) Displays the destination image in to the source image. 
	//    Only the part of the destination image that is INSIDE the source image is shown, 
	//    and the source image is transparent
	,"destination-in"	
	
	// 7) Displays the destination image out of the source image. 
	//    Only the part of the destination image that is OUTSIDE the source image is shown, 
	//    and the source image is transparent
	,"destination-out"	
	
	// 8) Displays the source image + the destination image
	,"lighter"	
	
	// 9) Displays the source image. The destination image is ignored
	,"copy"	
	
	// 10) The source image is combined by using an exclusive OR with the destination image
	,"xor"

];

GCO.normal = GCO[0];
window.GCO = GCO;