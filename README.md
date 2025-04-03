# Name Of The Site: Mewat_Sport 

## Features of the project:
It's a website for a sports academy, users can enroll in different courses through online.
### User Type and User Functionalities
* There are three types of users. Admin, Instructor, and Students. By default, every user is a Student.
* Admin can make any user Instructor or Admin. Admin can also manage courses. Admin can approve or reject any courses requested by Instructors. Also, Admin can send feedback for the rejection. Also can see how many students are enrolled for any particular course.
* An Instructor can add courses. While adding any course by default it'll be set to pending. If Admin approved only then the course will be added to the course list. Instructors can update any course if it's on pending or denied status. After approval, it can't be updated. An instructor can see their courses and enroll students in their courses.
* By default all the users are students. Only a student can be enrolled in any course. Students can add courses to the Cart. And after that students can check out the cart by providing payment info. Here we have used the stripe payment system.
* Users can update their info. But can't update the user role and email.
* For different kinds of users there are different private routes.
### Different sections:
#### Courses:
* On the home page there are several sections. In the courses section, they showed by most enrolled courses.
* Only approved courses will be shown there. Users can click on the card to see details about the course and add the course to the cart.
* To add any course user has to be logged in first. If the user is not logged in then it will bring the user to the login page. After adding any course to the cart the Add to Cart button will be disabled. Users can delete the cart item.
* From the cart page user can see the total price and then can make the payment by Clicking the checkout. After making the payment user will be counted as enrolled in the courses and 1  available seat will be deducted after successful payment from the courses.
* User can see their enrolled courses. If a user is enrolled in any course then the add to cart button will be disabled or if there is no available seat on the course then the button will be disabled too.
#### Instructor: 
* On the homepage there will be 6 instructor list. Those user's role is instructor only they will be shown on the list. Users can see details about them by clicking the card.
* Only instructors can add courses and update courses. But only denied and pending courses can be updated. After updating any denied course its status will be set to pending and if the admin accepts it then it'll get approved.
* Instructors can see how many students have been enrolled for their particular course.
* But the Instructor can't add any course to the cart.

  This is a very basic website, for now, lots of updates and features will be added soon In Sha Allah.

***
### Used packages/ technology:
##### Frontend
* React js, 
* React router dom, React Hook Form, React Hot Toast, React Icons, React Helmet
* Tailwind CSS, Daisy UI, Headless UI, 
* Swiper JS, Framer Motion, React-Simple-Typewriter, React Spinners
* Axios, React Query, Firebase, Stripe-JS
##### Backend
* Node JS
* Express JS
* MongoDB, CORS, Dotenv, JWT, Stripe 
### Here is the live link of the project:
Click here: [Mewat_Sport](https://northern-sports-academy.web.app/)



