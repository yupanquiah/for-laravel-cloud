<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('company',
  [CompanyController::class, 'index']
)->name('company');

Route::post('company',
    [CompanyController::class, 'store']
)->name('company.store');

Route::get('/api/countries/', function($id) {
  return DB::table('states')->get();
});
Route::get('/api/countries/{id}/states', function($id) {
  return DB::table('states')->where('country_id', $id)->get();
});

Route::get('/api/states/{id}/cities', function($id) {
  return DB::table('cities')->where('state_id', $id)->get();
});

Route::get('/api/countries/{id}/currencies', function($id) {
  return DB::table('currencies')->where('country_id', $id)->get();
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/admin', [AdminController::class, 'index'])->name('admin');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
