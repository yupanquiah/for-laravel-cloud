<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class CompanyController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('admin/company/index');
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request): RedirectResponse
  {
    $request->validate([
      'company_name'=> 'required|string',
      'type_company'=> 'required|string',
      'nit'=> 'required|unique:companies',
      'phone'=> 'required|unique:companies',
      'mail'=> 'required|unique:companies',
      'tax_amount'=> 'required|numeric',
      'tax_name'=> 'required|string',
      'currency'=> 'string',
      'address'=> 'required|string',
      'postal_code'=> 'required|string',
      'logo' => 'required|file|image|mimes:jpg,jpeg,png,webp|max:2048',
    ]);

    $nombreArchivo = $request->nit . '_' . $request->company_name . '.' . $request->file('logo')->getClientOriginalExtension();
    $path = $request->file('logo')->storeAs('logos', $nombreArchivo, 'public');

    $company = Company::create([
      'country'=>$request->country,
      'company_name'=>$request->company_name,
      'type_company'=>$request->type_company,
      'nit'=> $request->nit,
      'phone'=>$request->phone,
      'mail'=>$request->mail,
      'tax_amount'=>$request->tax_amount,
      'tax_name'=>$request->tax_name,
      'currency'=>$request->currency,
      'address'=>$request->address,
      'city'=>$request->city,
      'department'=>$request->department,
      'postal_code'=>$request->postal_code,
      'logo'=>$path,
    ]);

    $user = User::create([
      'name'=>'Admin',
      'email'=>$request->mail,
      'password'=>Hash::make($request->nit),
      'company_id'=>$company->id,
    ]);

    Auth::login($user);
    return to_route('dashboard');
  }

  /**
   * Display the specified resource.
   */
  public function show(Company $company)
  {
      //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Company $company)
  {
    //
  }

  public function editIdentity(Company $company) {
    $company = Auth::user()->company;
    $company_name = $company->company_name;

    return Inertia::render('admin/settings/identity',[
      'identity' => [
        'id' => $company->id,
        'company_name' => $company->company_name,
        'mail' => $company->mail,
        'nit' => $company->nit,
        'phone' => $company->phone,
        'type_company' => $company->type_company,
        'logo' => $company->logo,
      ],

      'company_name' => $company_name
    ]);
  }

  public function updateIdentity(Request $request, $id) {
    $request->validate([
      'company_name' => 'required|string',
      'type_company'=> 'required|string',
      'nit'=> 'required|unique:companies,nit,'.$id,
      'phone'=> 'required|unique:companies,phone,'.$id,
      'mail' => 'required|email|unique:companies,mail,'.$id,
    ]);

    $company = Company::findOrFail($id);

    $company->update([
      'company_name' => $request->company_name,
      'mail' => $request->mail,
      'nit' => $request->nit,
      'phone' => $request->phone,
      'type_company'=> $request->type_company,
    ]);

    $user = Auth::user();
    $user->update([
      'email' => $request->mail,
    ]);

    return back()->with('success', 'Información de la empresa actualizada correctamente.');
  }

  public function editLocation() {
    $company = Auth::user()->company;

    return Inertia::render('admin/settings/location',[
      'location' => [
        'id' => $company->id,
        'country' => $company->country,
        'department' => $company->department,
        'city' => $company->city,
        'postal_code' => $company->postal_code,
        'address' => $company->address,
      ],
    ]);
  }

  public function updateLocation(Request $request, $id) {
    $company = Company::findOrFail($id);

    $company->update([
      'country'=>$request->country,
      'address'=>$request->address,
      'city'=>$request->city,
      'department'=>$request->department,
      'postal_code'=>$request->postal_code,
    ]);

    return back()->with('success', 'Información de la empresa actualizada correctamente.');
  }

  public function editLogo() {
    $company = Auth::user()->company;

    return Inertia::render('admin/settings/logo',[
      'logo' => [
        'id' => $company->id,
        'logo' => $company->logo ? asset('storage/' . $company->logo) : null,
      ]
    ]);
  }

  public function updateLogo(Request $request, $id) {
    $company = Company::findOrFail($id);

    $company->update([
      'logo'=>$request->logo,
    ]);

    return back()->with('success', 'Información de la empresa actualizada correctamente.');
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Company $company)
  {
      //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Company $company)
  {
      //
  }
}
