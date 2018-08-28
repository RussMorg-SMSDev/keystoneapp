const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

    //sets highlighted item in navigation
	locals.section = 'tickets';
	locals.data = {
		tickets: [],
	};

  //Laods tickets
	view.on('init', function (next) {
		const q = keystone.list('Ticket').model.find();

		q.exec(function (err, results) {
			locals.data.tickets = results;
			next(err);
		});
	});

    //Render view
	view.render('tickets/ticketlist');
};
