import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { projectSchema, ProjectFormData } from '@/schemas/project.schema';
import { ZodError } from 'zod';

interface ProjectFormInterface {
  mode: string,
  slug: string
}

export default function ProjectForm({ mode, slug }: ProjectFormInterface) {

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    slug: '',
    description: '',
    link: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const fetchProject = async () => {
    setIsLoading(true);
    setMessage(null);
    setFieldErrors({});

    try {
      const response = await fetch(`/api/projects/${slug}`)
      if (!response.ok) throw new Error('Failed to fetch project')

      const project = await response.json();

      setFormData({
        title: project.title,
        slug: project.slug,
        description: project.description,
        link: project.link
      });
    } catch (e) {
      console.error('Error fetching project: ', e)
    } finally {
      setIsLoading(false);
    }
  }

  const setErrors = (dataErrors: Array<{ field: string, message: string }>) => {
    const errors: Record<string, string> = {};
    dataErrors.forEach((err: { field: string; message: string }) => {
      errors[err.field] = err.message;
    });
    setFieldErrors(errors);
    setMessage({ type: 'error', text: 'Please fix the errors below' });
  }

  const saveProject = async (validatedData: ProjectFormData, mode: string, slug: string) => {
    setIsLoading(true)

    try {
      const fetchPath = mode === 'new' ? '/api/projects' : `/api/projects/${slug}`;

      const response = await fetch(fetchPath, {
        method: mode === 'new' ? 'POST' : 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors)
        } else {
          throw new Error(data.error || 'Failed to save project');
        }
        return;
      }

      setMessage({
        type: 'success',
        text: mode === 'new' ? 'Project created successfully!' : 'Project updated successfully',
      });

      setTimeout(() => {
        window.location.replace('/dashboard/projects')
      }, 1000)

    } catch (error) {
      if (error instanceof ZodError) {
        // Handle client-side validation errors
        const errors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const field = err.path[0];
          if (field) {
            errors[field.toString()] = err.message;
          }
        });
        setFieldErrors(errors);
        setMessage({ type: 'error', text: 'Please fix the errors below' });
      } else {
        setMessage({
          type: 'error',
          text: error instanceof Error ? error.message : 'An error occurred'
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const deleteProject = async (slug: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/projects/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors)
        } else {
          throw new Error(data.error || 'Failed to delete project');
        }
        return;
      }

      setMessage({
        type: 'success',
        text: 'Project deleted successfully!',
      });

      setTimeout(() => {
        window.location.replace('/dashboard/projects')
      }, 1000)
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'An error occurred'
      });
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchProject();
    }

    const deleteButton = document.querySelector('.delete-btn');

    deleteButton && deleteButton.addEventListener('click', () => {
      window.alert('Are you sure you want to delete this project?')
      deleteProject(slug)
    })
  }, [slug])


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validatedData = projectSchema.parse(formData);
    saveProject(validatedData, mode, slug);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {message && (
          <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <div className="mb-4">
          <Label htmlFor="title" className="font-medium">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Project title"
            className="mt-2"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {fieldErrors.title && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="slug" className="font-medium">
            Slug
          </Label>
          <Input
            id="slug"
            name="slug"
            placeholder="Project slug (e.g., my-awesome-project)"
            className="mt-2"
            value={formData.slug}
            onChange={handleChange}
            required
          />
          {fieldErrors.slug && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.slug}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="description" className="font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Project description"
            className="mt-2"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {fieldErrors.description && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="link" className="font-medium">
            Link
          </Label>
          <Input
            id="link"
            name="link"
            placeholder="https://example.com"
            className="mt-2"
            type="url"
            value={formData.link}
            onChange={handleChange}
            required
          />
          {fieldErrors.link && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.link}</p>
          )}
        </div>
        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {mode === "new" ?
              isLoading ? 'Saving...' : 'Save project'
              :
              isLoading ? 'Updating...' : 'Update project'
            }
          </Button>
          {mode !== 'new' && (
            <Button variant="destructive" isLoading={isLoading} className="delete-btn">
              Delete
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
