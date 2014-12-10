Meteor.publish('peeps',function(){
	return Peeps.find();
});