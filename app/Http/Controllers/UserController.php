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
    $users = User::with('roles')
      ->where('company_id', $company)
      ->get()
      ->map(function ($user){
        return [
          'id' => $user->id,
          'name' => $user->name,
          'email' => $user->email,
          'company_id' => $user->company_id,
          'role' => $user->roles->pluck('name')->first()
        ];
      });

    return Inertia::render('admin/users/index', [
      'users' => $users,
      'roles' => DB::table('roles')->get(),
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
    $request->validate([
      'name' => 'required',
      'email' => 'required|email|unique:users,email,' . $id,
      'role' => 'required'
    ]);

    $user = User::findOrFail($id);
    $user->name = $request->name;
    $user->email = $request->email;

    if ($request->filled('password')) {
      $user->password = Hash::make($request->password);
    }

    $user->save();

    // Remove all roles and assign the new one
    $user->syncRoles([$request->role]);

    return back()->with('success', 'Usuario actualizado correctamente');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    $user = User::findOrFail($id);
    $user->delete();

    return back()->with('success', 'Usuario eliminado correctamente');
  }
}
