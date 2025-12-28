'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../../components/ProtectedRoute';
import SEO from '../../../components/Seo';

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to create a task.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, status: 'pending' }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Something went wrong.');
      } else {
        router.push('/');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <SEO title="Create Task - TaskMaster" description="Add a new task to your dashboard" />
      <div className="max-w-lg mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create Task</h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <input
            type="text"
            placeholder="Task Title"
            className="w-full p-3 mb-4 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Task Description"
            className="w-full p-3 mb-4 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-70"
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
