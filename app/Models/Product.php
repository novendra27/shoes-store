<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = ['created_at', 'updated_at'];
    
    protected $fillable = [
        'image',
        'title',
        'description',
        'price',
        'stock',
    ];
}
