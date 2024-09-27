<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;

    protected $fillable = ['goal_id', 'content'];

    /**
     * A template belongs to a goal.
     */
    public function goal()
    {
        return $this->belongsTo(Goal::class, 'goal_id');
    }
}
