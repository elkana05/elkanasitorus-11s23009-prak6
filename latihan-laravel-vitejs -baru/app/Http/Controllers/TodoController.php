<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index(Request $request)
{
    $user = $request->user();
    $query = $user->todos()->getQuery();

    if ($search = $request->input('search')) {
        $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%$search%")
              ->orWhere('description', 'like', "%$search%");
        });
    }

    if (!is_null($request->input('is_finished'))) {
        $query->where('is_finished', filter_var($request->input('is_finished'), FILTER_VALIDATE_BOOLEAN));
    }

    $todos = $query->orderBy('created_at', 'desc')
                   ->paginate(20)
                   ->withQueryString();

    // ✅ Format data untuk Inertia dengan struktur meta
    return Inertia::render('app/TodosPage', [
        'todos' => [
            'data' => $todos->items(),
            'meta' => [
                'current_page' => $todos->currentPage(),
                'last_page' => $todos->lastPage(),
                'per_page' => $todos->perPage(),
                'total' => $todos->total(),
                'from' => $todos->firstItem(),
                'to' => $todos->lastItem(),
                'links' => $todos->linkCollection()->toArray(), // ← PENTING!
            ]
        ],
        'filters' => $request->only(['search', 'is_finished']),
    ]);
}

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover' => 'nullable|image|max:2048',
            'is_finished' => 'sometimes|boolean',
        ]);

        $data['user_id'] = $request->user()->id;

        if ($request->hasFile('cover')) {
            $data['cover'] = $request->file('cover')->store('covers', 'public');
        }

        $todo = Todo::create($data);

        return redirect()->back()->with('success', 'Todo created successfully');
    }

    public function update(Request $request, Todo $todo)
    {
        if ($todo->user_id !== $request->user()->id) {
            abort(403);
        }
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover' => 'nullable|image|max:2048',
            'is_finished' => 'sometimes|boolean',
        ]);

        if ($request->hasFile('cover')) {
            // delete old if exists
            if ($todo->cover) {
                Storage::disk('public')->delete($todo->cover);
            }
            $data['cover'] = $request->file('cover')->store('covers', 'public');
        }

        $todo->update($data);

        return redirect()->back()->with('success', 'Todo updated successfully');
    }

    public function destroy(Request $request, Todo $todo)
    {
        if ($todo->user_id !== $request->user()->id) {
            abort(403);
        }
        if ($todo->cover) {
            Storage::disk('public')->delete($todo->cover);
        }

        $todo->delete();

        return redirect()->back()->with('success', 'Todo deleted successfully');
    }

    // simple stats endpoint for charts
    public function stats(Request $request)
    {
        $user = $request->user();

        $total = Todo::where('user_id', $user->id)->count();
        $finished = Todo::where('user_id', $user->id)->where('is_finished', true)->count();
        $notFinished = $total - $finished;

        return response()->json([
            'total' => $total,
            'finished' => $finished,
            'notFinished' => $notFinished,
        ]);
    }
}
