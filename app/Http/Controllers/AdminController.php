<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
  public function index() {
    $company = Auth::user()->company;
    $company_name = $company->company_name;

    return Inertia::render('admin/index', [
      'company_name' => $company_name
    ]);
  }
}
