Assessment

Set up the project:

- Git clone the repo
- copy `.env.example` to `.env`
- update DB credentials with your one
- create a database named `laravel_assessment`
- `composer update`
- `npm install`
- `php artisan migrate`
- generate an app key `php artisan key:generate`
- `npm run dev`
- `php artisan serve`
- Login page will be available in `localhost:8000/login`

Project details:

- A person can register himself as an admin using the registration form
  Required fields: First Name, Surname, Email and Password

- He/She can login and view, create, update or delete their clients

- Client has: First name, surname, email and profile picture

- A scheduler is available for weekly reporting to each admins with their client details
  ` php artisan schedule:work`
    mail is logged in default log file
# assessment
