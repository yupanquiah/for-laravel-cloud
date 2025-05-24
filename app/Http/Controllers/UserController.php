<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $company = Auth::user()->company_id;
    $users = User::where('company_id', $company)->get();

    return Inertia::render('admin/users/index', [
      'users' => $users,
      'roles' => DB::table('roles')->get()
    ]);
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
  public function store(Request $request)
  {
    $request->validate([
      'name'=>'required',
      'email'=>'required|unique:users',
      'password'=>'required|confirmed',
    ]);

    $user = User::create([
      'name'=>$request->name,
      'email'=>$request->email,
      'password'=>Hash::make($request->password),
      'company_id'=>Auth::user()->company_id,
    ]);

    $user->assignRole($request->role);



    return back()->with('success', 'Se registro correctamente');
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
