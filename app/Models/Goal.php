<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'due_date',
        'priority',
        'status',
        'category',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function resources()
    {
        return $this->hasMany(Resource::class, 'goal_id');
    }

    public function template()
    {
        return $this->hasOne(Template::class, 'goal_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'goal_id');
    }
}
