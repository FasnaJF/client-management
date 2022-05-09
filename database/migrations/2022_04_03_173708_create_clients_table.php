<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('surname');
            $table->string('email')->unique();
            $table->string('profile_picture');
            $table->integer('admin_id');
            $table->timestamps();
            $table->index('admin_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
