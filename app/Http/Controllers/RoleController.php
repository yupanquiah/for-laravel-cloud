<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class RoleController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('admin/roles/index', [
      'roles' => DB::table('roles')->select('id', 'name')->get()
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
      'name' => 'required|unique:roles'
    ]);

     DB::table('roles')->insert([
      'name' => $request->name,
      'guard_name' => 'web',
    ]);


    return to_route('role.index');
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    return Inertia::render('admin/roles/show', [
      'role' => DB::table('roles')->where('id', $id)->first()
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {

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
    DB::table('roles')->where('id', $id)->delete();
    return to_route('role.index')->with('success', 'Rol eliminado correctamente');
  }
}
