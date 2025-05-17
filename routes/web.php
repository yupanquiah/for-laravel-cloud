<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\DB;

Route::get('/', function () { return Inertia::render('welcome'); })->name('home');
Route::get('company',[CompanyController::class, 'index'])->name('company');
Route::post('company',[CompanyController::class, 'store'])->name('company.store');

// API for locations
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
  Route::get('dashboard', function () { return Inertia::render('dashboard'); })->name('dashboard');
  Route::get('admin', [AdminController::class, 'index'])->name('admin');

  Route::get('company/identity', [CompanyController::class, 'editIdentity'])->name('identity.edit');
  Route::patch('company/identity/{id}', [CompanyController::class, 'updateIdentity'])->name('identity.update');

  Route::get('company/location', [CompanyController::class, 'editLocation'])->name('location.edit');
  Route::patch('company/location/{id}', [CompanyController::class, 'updateLocation'])->name('location.update');

  Route::get('company/logo', [CompanyController::class, 'editLogo'])->name('logo.edit');
  Route::patch('company/logo/{id}', [CompanyController::class, 'updateLogo'])->name('logo.update');

  Route::get('role', [RoleController::class, 'index'])->name('role.index');
  Route::post('role', [RoleController::class, 'store'])->name('role.store');
  Route::get('role/{id}', [RoleController::class, 'show'])->name('role.show');
  Route::delete('role/{id}', [RoleController::class, 'destroy'])->name('role.destroy');
  Route::patch('role/{id}', [RoleController::class, 'update'])->name('role.update');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
