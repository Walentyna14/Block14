var main = function(){
	$('input').change(change);
	window.topLineText = "";
	window.bottomLineText = "";
	$('#file').change(handleFileSelect);
	$('button').click(saveFile);
	image = new Image();
	image.onload = imageLoad;
	image.src = 'tlo.png';
}

$(document).ready(main);


var imageLoad = function() {
	window.imageSrc = this;
	redrawMeme(window.imageSrc, null, null);
}

var change = function(evt){
	
	var id = evt.target.id;
	var text = evt.target.value;
	var stroke, fill;
	
	switch(id){
		case 'topLineText': window.topLineText = text; break;
		case 'bottomLineText': window.bottomLineText = text; break;
		case 'strokeStyle': stroke = text; break;
		case 'fillStyle': fill = text; break;
		
	}
	
	redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText, stroke, fill );
}

function redrawMeme(image, topLine, bottomLine, stroke, fill) {
	// Get Canvas2DContext
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext("2d");
	if (image != null)
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	
	// Text attributes
	ctx.font = '25px Impact';
	ctx.textAlign = 'center';
	ctx.strokeStyle = stroke;
	ctx.fillStyle = fill;
	
	if (topLine != null) {
		ctx.fillText(topLine, canvas.width / 2, 40);
		ctx.strokeText(topLine, canvas.width / 2, 40);
	}
	
	if (bottomLine != null) {
		ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
		ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
	}
}

function saveFile() {
	window.open(document.querySelector('canvas').toDataURL());
}

function handleFileSelect(evt) {
	var file = evt.target.files[0];
	var reader = new FileReader();
	reader.onload = function(fileObject) {
		var data = fileObject.target.result;
		image.src = data;
		console.log(fileObject.target.result);
	};
	reader.readAsDataURL(file)
}