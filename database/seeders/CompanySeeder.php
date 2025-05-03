<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('companies')->insert([
            'country' => 'Colombia',
            'company_name' => 'Empresa Demo S.A.S.',
            'type_company' => 'S.A.S.',
            'nit' => '900123456',
            'phone' => '+57 3001234567',
            'mail' => 'contacto@demo.com',
            'tax_amount' => 19,
            'tax_name' => 'IVA',
            'currency' => 'COP',
            'address' => 'Calle 123 #45-67',
            'city' => 'Bogotá',
            'department' => 'Cundinamarca',
            'postal_code' => '110111',
            'logo' => 'logo.png',
        ]);
    }
}
