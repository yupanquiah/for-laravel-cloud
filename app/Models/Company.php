<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'country',
        'company_name',
        'type_company',
        'nit',
        'phone',
        'mail',
        'tax_amount',
        'tax_name',
        'currency',
        'address',
        'city',
        'department',
        'postal_code',
        'logo',
    ];

    public function users(){
      return $this->hasMany(User::class);
    }
}
