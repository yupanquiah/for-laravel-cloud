<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
  public function index() {
    $total_roles = DB::table('roles')->count();
    $company = Auth::user()->company;
    $company_name = $company->company_name;

    return Inertia::render('admin/index', [
      'company_name' => $company_name,
      'total_roles' => $total_roles,
    ]);
  }

  public function dashboard() {
    $total_roles = DB::table('roles')->count();
    $company = Auth::user()->company;
    $company_name = $company->company_name;

    return Inertia::render('dashboard', [
      'company_name' => $company_name,
      'total_roles' => $total_roles,
    ]);
  }
}
