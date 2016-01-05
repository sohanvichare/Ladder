Ladder EDU | A homework/task scheduling app with a powerful machine learning backend.
=====================

Devpost: http://devpost.com/software/ladder-xcpubz
Demo Video: https://www.youtube.com/watch?v=OPrWnt15u80

Built by Sohan Vichare (http://sovicx.com), Adiyan Kaul, Varun Shenoy, and Yash Tandon

Originally built at HackingEDU 2015

##Insipiration
 Ladder was born out of necessity. We as a team are privileged to attend Cupertino High School, one of the best high schools in the area and in the nation. However, all of us have felt or experienced severe student stress either firsthand or secondhandedly.
 This continuous, omnipresent, pressure to excel has caused repetitive student suicides at schools such as Gunn High School. We spent the first three hours of this hackathon researching causes of student stress in high academically achieving areas, and were not so surprised to see that the number one reason students didn't do as well as they could have in school in these areas was due to constant distraction from social media websites/other attractions on the internet. Ladder was born from this knowledge.
 We set our minds and our hearts against this problem and came up with a solution we are truly proud of. 

## How we built it
The heart and soul of our application is our supervised machine learning algorithm, which we like to call M1.  M1 captures the vast amount of data that mobile devices and computers are so adept at capturing these days, such as the amount of time you are writing vs being distracted (using Pebble), the frequency that you need more time than you scheduled for a certain subject, and your grades in each class (just to name a few), and compiles and uses the basic principles of geometry to analyze and find trends between various data points. These trends are later boiled down into meaningful data which is used by M1 to generate a customized homework schedule for you geared towards working efficiency and maximizing your grades. If you're interested, you can view a complete explanation of the logic behind our learning algorithm (http://tinyurl.com/pltxru5)

We integrated a variety of APIs  and technologies into our project. We built the application using Ionic and AngularJS, which allowed us to test and deploy on iOS, web, and Android. M1 pulled and read all of its data from clusterpoint, which is integrated in Ladder. Twilio is used in both Ladder and Scalae (our Pebble companion app) in order to achieve a more personal connection with the user (ex. sending motivational text messages). We integrated Chegg to show users where to find additional resources if they get stuck on a homework assignment, and we're working on integrating some of the technologies in IBM Bluemix to make M1 more robust. We used CloudPebble to develop our Pebble companion app. 

## What's next
1) Making M1 more robust. M1 is the core of our app, but it was only built within 36 hours. Our first step will be to  refine and perfect it. 

 2) Finding tutors. We want to roll out a feature which allows students to connect with other students who are doing the same homework at the same time and have better grades (all things which our app takes in already). This would allow a student on one side of the country who is great at math but horrible at writing to engage in a mutually beneficial relationship with a student on the opposite side of the country who is great at writing but horrible at math. We're very excited about this idea and we're eager to begin developing it and putting it into action.

 3)Improving Scalae. As Ladder grows, so should Scalae. We're eager to learn more about the capabilites of the Pebble watch, and make Scalae have a similar UI feel through animations and color as is older sister. 
 
 
##Check it out
http://devpost.com/software/ladder-xcpubz
https://www.youtube.com/watch?v=OPrWnt15u80
