var Puzzles_picture;

var Puzzles_canvas;
var Puzzles_context;

var Puzzles_horizontal_puzzles_count;
var Puzzles_vertical_puzzles_count;

var Puzzles_array;

var Puzzles_all_in_final_position = true;

function Puzzle(pos_x, pos_y, width, height, final_pos_x, final_pos_y)
{
	this.Position_x = pos_x;
	this.Position_y = pos_y;
	this.Width = width;
	this.Height = height;
	this.Final_position_x = final_pos_x;
	this.Final_position_y = final_pos_y;
	
	this.Draw = function(canvas, context, picture) 
	{
		var width = canvas.width * this.Width / picture.width;
		var height = canvas.height * this.Height / picture.height;
		var pos_x = canvas.width * this.Position_x / picture.width;
		var pos_y = canvas.height * this.Position_y / picture.height;
		context.drawImage(picture,this.Final_position_x,this.Final_position_y,this.Width,this.Height,pos_x,pos_y,width,height);
	}
	
	this.Move = function(move_x, move_y, picture)
	{
		this.Position_x += move_x * picture.width / this.Width;
		this.Position_y += move_y * picture.height / this.Height;
	}
	
	this.IsInFinalPostion = function(width_tolerance, height_tolerance)
	{
		var wt = Math.abs(width_tolerance);
		var ht = Math.abs(height_tolerance);
		if(this.Final_position_x - wt <= this.Position_x && this.Final_position_x + wt >= this.Position_x
		&& this.Final_position_y - ht <= this.Position_y && this.Final_position_y + ht >= this.Position_y)
		{
			this.Position_x = this.Final_position_x;
			this.Position_y = this.Final_position_y;
			return true;
		}
		
		return false;
	}
}

function Puzzles_animate()
{
	Puzzles_all_in_final_position = true;
	Puzzles_context.fillRect(0,0,Puzzles_canvas.width,Puzzles_canvas.height);
	for (var i = 0; i < Puzzles_array.length; ++i)
	{
		if(!Puzzles_array[i].IsInFinalPostion(10,10))
		{
			Puzzles_array[i].Move(0,1,Puzzles_picture);
			Puzzles_all_in_final_position = false;
		}
		Puzzles_array[i].Draw(Puzzles_canvas, Puzzles_context, Puzzles_picture);
	}
	
	if(!Puzzles_all_in_final_position)
	{
		setTimeout(Puzzles_animate,10);
	}
	
}

function Puzzles_start()
{
	var puzzle_width = Puzzles_picture.width / Puzzles_horizontal_puzzles_count;
	var puzzle_height = Puzzles_picture.height / Puzzles_vertical_puzzles_count;
	
	Puzzles_array = [];
	for(var i=0; i<Puzzles_vertical_puzzles_count; ++i)
	{
		for(var j=0; j<Puzzles_horizontal_puzzles_count; ++j)
		{
			var index = i*Puzzles_horizontal_puzzles_count + j;
			Puzzles_array[index] =  new Puzzle(j*puzzle_width,-index*puzzle_height*0.2,puzzle_width,puzzle_height,j*puzzle_width,i*puzzle_height);
		}
	}
		
	Puzzles_animate();
	//TODO
		
	//for (var i = 0; i < Puzzles_array.length; ++i)
	{
		//Puzzles_array[i].Draw(Puzzles_canvas, Puzzles_context, Puzzles_picture);
	}	
}

function InitializePuzzles(canvas_id, width, height, picture_src, horizontal_puzzles_count, vertical_puzzles_count)
{
	Puzzles_canvas = document.getElementById(canvas_id);
	Puzzles_context = Puzzles_canvas.getContext("2d");
	
	Puzzles_canvas.width = width;
	Puzzles_canvas.height = height;
	
	Puzzles_horizontal_puzzles_count = horizontal_puzzles_count;
	Puzzles_vertical_puzzles_count = vertical_puzzles_count;
	
	Puzzles_picture = new Image();
	Puzzles_picture.src = picture_src;
	Puzzles_picture.onload = function() { Puzzles_start(); }
}