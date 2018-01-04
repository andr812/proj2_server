module.exports = function(app, pBook, gall, ord)
{
    // GET ALL BOOKS
    app.get('/api/pbooks', function(req,res){
        pBook.find(function(err, pbooks){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(pbooks);
	    console.log("Get Sent"); 
        })
    });
    // GET ALL GALLERY
    app.get('/api/pics',function(req,res){
	gall.find(function(err, gall){
	   if(err) return res.status(500).send({error: 'database failure'});
	   res.json(gall);
           console.log("Gallery Sent");
	})
     });

    // GET SINGLE BOOK
    app.get('/api/pbooks/:pbook_id', function(req, res){
        pBook.findOne({_id: req.params.book_id}, function(err, pbook){
            if(err) return res.status(500).json({error: err});
            if(!book) return res.status(404).json({error: 'book not found'});
            res.json(pbook);
        })
    });

    // GET BOOK BY NAME
    app.get('/api/pbooks/name/:name', function(req, res){
        pBook.find({name: req.params.name}, {_id: 0, phonenum: 1, published_date: 1},  function(err, pbooks){
            if(err) return res.status(500).json({error: err});
            if(pbooks.length === 0) return res.status(404).json({error: 'book not found'});
            res.json(pbooks);
        })
    });

    // CREATE BOOK
    app.post('/api/pbooks', function(req, res){
    	
        for (var key in req.body) {
 	  if (req.body.hasOwnProperty(key)) {
  	var pbook= new pBook();
    pbook.name = req.body[key]["name"];
    pbook.phonenum = req.body[key]["phonenum"];
    console.log(pbook.name);
    console.log(pbook.phonenum);
    pbook.save(function(err){
	if(err){
		console.error(err);
		res.json({result: 0});
		return;
		} 
		});  
       } }
     
	res.json({result: 1});
        });
	//GET
	app.get('/api/orders', function(req, res){
	var number;
	ord.count({},function(err, count){
	if(err) return handleError(err);
	number=count;
	console.log("w"+number);
	if(number==4){
		ord.find(function(err,ord){
		if(err) return res.status(500).send({error: 'database failure'});
		res.json(ord);
		console.log("Get Sent");
	});}
	if(number<4){
		var result = [];
		result.push({name: "0", ordernum: 0, index: 0});
		res.contentType('application/json');
		res.send(JSON.stringify(result));
	}
	});
	});
    // CREATE GALLERY
    app.post('/api/pics',function(req, res){
	for(var key in req.body){
		if(req.body.hasOwnProperty(key)){
		var gallery=new gall();
		gallery.img=req.body[key]["img"];
		gallery.content=req.body[key]["content"];
		console.log(gallery.img);
		console.log(gallery.content);
		gallery.save(function(err){
		if(err){
			console.error(err);
			res.json({result: 0});
			return 0;
			}
		});
		} }
		res.json({result: 1});
		console.log("Success");
});
/*
    //CREATE ORDER
   app.post('/api/orders',function(req, res){
	var order = new ord();
	order.name=req.body.name;
	order.ordernum=req.body.ordernum;
	console.log(order.name);
	console.log(order.ordernum);
	order.save(function(err){
	if(err){
		console.error(err);
		res.json({result: 0});
		return;
	}
	res.json({result: 1});
	console.log("Got Post");
	});
});*/
   
 //Get 1st Vote
   app.post('/api/orders', function(req, res){
	var query= {state: 'OK'};
	var number;
	var events;
	ord.count({}, function(err, count){
	if(err) return handleError(err);
	number=count;
	console.log("w"+number);
	if(number==2){
	var order = new ord();
	order.name=req.body.name;
	order.ordernum=req.body.ordernum;
	order.index=1;
	console.log(order.name);
	console.log(order.ordernum);
	console.log(order.index);
	console.log("You");
	order.save(function(err){
	if(err){
		console.error(err);
		res.json({result: 0});
		return ;
	}
	});
	res.json({result: 1});
	return;
	}
	
	
	 if(number>=4){
	console.log("Inside");	
	res.json({result: 0});
	return ;
	}

	if(number<4){
	 var order = new ord();
	 order.name= req.body.name;
	 order.ordernum=req.body.ordernum;
	 order.index=0;
	 console.log(order.name);
	 console.log(order.ordernum);
	 order.save(function(err){
	 if(err){
		console.error(err);
		res.json({result: 0});
		return;
	}
	res.json({result:1});
	return ;
	console.log("Got Post");
	});
	}
	});
});
	





    // UPDATE THE BOOK
    app.put('/api/pbooks/:pbook_id', function(req, res){
        pBook.update({ _id: req.params.pbook_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'book not found' });
            res.json( { message: 'book updated' } );
        })
    /* [ ANOTHER WAY TO UPDATE THE BOOK ]
            Book.findById(req.params.book_id, function(err, book){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!book) return res.status(404).json({ error: 'book not found' });

            if(req.body.title) book.title = req.body.title;
            if(req.body.author) book.author = req.body.author;
            if(req.body.published_date) book.published_date = req.body.published_date;

            book.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'book updated'});
            });

        });
    */
    });
   app.post('/api/orders/:name', function(req, res){
	ord.remove({name:req.body.name}, function(err, output){
	if(err) return res.status(500).json({err: "database failure" });
	console.log("deletion complete");
	var order=new ord();
	order.name=req.body.name;
	order.ordernum=req.body.ordernum;
	
	order.save(function(err){
	if(err){
		console.error(err);
		res.json({result: 0});
		return;
	}
	res.json({result: 1});
	});
});
});

    // DELETE BOOK
    app.delete('/api/pbooks/:pbook_id', function(req, res){
        pBook.remove({ _id: req.params.pbook_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "book not found" });
            res.json({ message: "book deleted" });
            */

            res.status(204).end();
        })
    });
     
}
