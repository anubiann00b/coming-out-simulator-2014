// Characters!
n = new Character({ align:"right", color:"#4099ff" });
m = new Character({ align:"left", color:"#ffffff" });

// PLOT POINTS:
// 1) Studying at Jack's
// 2) Suspecting Jack is gay
// 3) Trying to get you a private tutor (threatening your relationship)

// Needs: more inconsistency & lying caught in the 2nd section.

//. . .

// 4) Convinced Jack's negatively affecting you
// 5) Crying and gaslighting (Reveal -- your phone's texts were read.)

// What ARE you.
// I'm straight.
// I'm bisexual.
// I'm your SON, goddammit.

// 6) Choice - promising you NOT TO TELL YOUR DAD.
// 7) Dad's back home (pretend normal)
// 8) Mom/you break it.
// 9) A heated argument with all your past lies/confessions piling up
// 10) Something horrible. (Punch / Change schools / Private tutor)

///////////////////////////////////
////// 1) STUDYING AT Jack'S ///////
///////////////////////////////////

function Start(){

	n("Hey mom.");
	m("Hi sweetie. What's your plans for tomorrow?");
	n("Oh. Uh... studying.")
	n("Yeah. Tomorrow I'm studying.");
	m("What subject?");
	n("Er...");

	Choose({
		"Chemistry.": function(message){
			$.studying_subject = "Chemistry";
			Start_2(message);
		},
		"Calculus.": function(message){
			$.studying_subject = "Calculus";
			Start_2(message);
		},
		"Compsci.": function(message){
			$.studying_subject = "Computer Science";
			Start_2(message);
		}
	});

}

function Start_2(message){

	n(message);
	m("Good.");
	m("You really, really could improve your grades in your "+$.studying_subject+" class.");
	n(". . .");
	m("So, I'll be at the library tomorrow.");
	m("Will I see you studying there?");
	n("Actually, I'm gonna study at Jack's place.");
	m("Again?");
	m("You spend a lot of time with him.");

	Choose({
		"We just study together, that's all.": function(message){
			$.relationship = "study";
			Buddy_1(message);
		},
		"Well yeah, that's what good pals do.": function(message){
			$.relationship = "friend";
			Buddy_1(message);
		},
		"Mom, Jack is... more than a friend.": function(message){
			$.relationship = "best friend";
			n(message);
			m("Oh, like best friends?");
			n("Um. Well--");
			m("Hey, that's okay to have a best friend.");
			n("...Okay.");
			m(". . .");
			Buddy_1_point_5();
		},
	});

}


///////////////////////////////////////
////// 2) SUSPECTING Jack IS GAY ///////
///////////////////////////////////////


function Buddy_1(message){
	n(message);
	m("Okay. I'm just making sure.");
	n("Of... what?");
	Buddy_1_point_5();
}

function Buddy_Caught_Lying_1(message,callback){
	n(message);
	m("Wait...");
	m("I thought you said you 'just study together'.");
	m("You didn't tell me you were friends.");
	$.lying_about_relationship = true;
	Choose({
		"Oops, I meant he's just a studymate.": callback,
		"Well, he can also be my friend...": callback,
		"No, I always said we were friends.": callback
	});
}

function Buddy_1_point_5(){

	m("Just... don't hang around him too much.");
	m("People might get the wrong idea.");

	Choose({
		"Oh. No, yeah, we're just friends.": function(message){
			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,Buddy_2);
			}else{
				Buddy_2(message);
			}
		},
		"What do you mean by... wrong idea?": Buddy_3,
		"The wrong idea might be the right idea.": Buddy_4
	});

}

function Buddy_2(message){
	n(message);
	m("Okay.");
	if($.lying_about_relationship){
		m("Just don't lie to me.");
		n("I won't.");
		m(". . .");
		m("But... about you hanging out with Jack.");
	}
	m("It's just that some people might assume things, since...");
	m("You know... he looks like...");
	m("A gay?");
	Buddy_Choice();
}

function Buddy_3(message){
	n(message);
	m("Just between mother and son, I think he might be... you know...");
	n("No, what?");
	m("A gay!");
	m("He looks and talks like a gay.");
	Buddy_Choice();
}

function Buddy_4(message){
	n(message);
	m("Oh, that's like a zen thing, right?");
	n("Um.");
	m("Zen is also about nature, and your classmate Jack, he...");
	m("...you know, doesn't seem natural?");
	Choose({
		"You think he's gay.": function(message){
			n(message);
			m("Yes!");
			m("You suspect it, too!");
			$.thinks_you_hate_gays = true;
			Buddy_Choice();
		},
		"Don't say that about my friend!": function(message){

			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,function(message){

					n(message);
					m("Okay.");
					m("Just don't lie to me.");
					n("I won't.");
					m(". . .");

					m("But yes, even you agree that it's bad to be seen as 'not natural'.");
					n("I never said--");
					m("And I'm just looking out for you! Because he acts like, you know...");
					m("A gay!");
					$.thinks_you_hate_gays = true;
					Buddy_Choice();

				});
			}else{

				n(message);
				m("I'm just being honest.");
				m("But yes, even you agree that it's bad to be seen as 'not natural'.");
				n("I never said--");
				m("And I'm just looking out for you! Because he acts like, you know...");
				m("A gay!");
				$.thinks_you_hate_gays = true;
				Buddy_Choice();

			}

		},
		"What do you mean, he's not natural?": Buddy_3
	});
}

function Buddy_Choice(){
	if($.relationship=="friend"){
		m("And since you say he's a 'good pal'...");
		m("People might think you're a gay like him, too.");
	}
	if($.relationship=="best friend"){
		m("And since you say he's your BEST friend...");
		m("People might think you're a gay like him, too.");
	}
	Choose({
		"Ha, he sure acts gay. Luckily, he's not.": function(message){
			$.thinks_you_hate_gays = true;
			n(message);
			m("See? You also think there's something not right about it.");
			n("...sure.");
			Buddy_Aftermath();
		},
		"Maybe... my friend might be gay.": function(message){

			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,function(message){
					n(message);
					m("Okay.");
					m("Just don't lie to me.");
					n("I won't.");
					m(". . .");
					Buddy_Aftermath();
				});
			}else{
				n(message);
				Buddy_Aftermath();
			}
			
		},
		"What's wrong with being gay?!": function(message){
			n(message);
			m("Nothing! Nothing.");
			Buddy_Aftermath();
		}
	});
}


function Buddy_Aftermath(){
	m("Don't get me wrong.");
	m("I'm not saying those kind of people are bad!");
	m("I just think... you should be careful around one of them.");
	m("Jack might, you know, try to recruit you.");

	Choose({
		"what.": Buddy_Aftermath_2,
		"whaaat.": Buddy_Aftermath_2,
		"whaaaaaaaaaaaaaaat.": Buddy_Aftermath_2
	});
}

function Buddy_Aftermath_2(message){
	
	n(message);

	n("How do you even...");
	n("Ugh, nevermind.");
	m("Nick, I'm sorry you find me annoying.");
	n("No, mom, stop doing th--");
	m("Let's go back to talking about your grades.");
	m("Now, what did you say you were studying tomorrow?");
	n(". . .");
	n("Errrmmmmm...");

	Choose({
		"Compsci?": function(message){
			$.studying_subject_2 = "Computer Science";
			Grades_Start(message);
		},
		"Chemistry?": function(message){
			$.studying_subject_2 = "Chemistry";
			Grades_Start(message);
		},
		"Calculus?": function(message){
			$.studying_subject_2 = "Calculus";
			Grades_Start(message);
		}
	});

}


//////////////////////////////////////////
////// 3) A POSSIBLE PRIVATE TUTOR ///////
//////////////////////////////////////////

function Grades_Start(message){
	n(message);
	m(". . .");
	if($.studying_subject!=$.studying_subject_2){
		Grades_Start_1();
	}else{
		Grades_Start_2();
	}
}

function Grades_Start_1(){
	m("You first told me it was "+$.studying_subject+".");
	m("Now you tell me it's "+$.studying_subject_2+"?");
	$.lying_about_studying = true;
	n("Mom, I was just confus--");
	if($.lying_about_relationship){
		m("This is TWICE you've lied to me during this dinner.");
		n("I didn't lie about--");
	}
	m("Either way, your grades in both subjects are terrible.");
	n(". . .");
	Grades_Explaining();
}

function Grades_Start_2(){
	m("You hesitated for a moment there.");
	n("I was eating.");
	m("Okay.");
	m(". . .");
	m("Still, your grades in your "+$.studying_subject_2+" class are terrible.");
	n(". . .");
	Grades_Explaining();
}

// For now, end the conversation here.
// Feedback FRIIIIDAY.

function Grades_Explaining(){
	n("[End of rough prototype! Yup, how anti-climatic.]");
	/*Choose({
		"That's why I'm studying more with Jack.": n,
		"Look, I'm trying. I really am.": n,
		"My grades are fine.": n
	});*/
}
