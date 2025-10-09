"use client"

import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';

export default function Projects() {
  return (
    <div>
      <form>
        <div className="mb-4">
          <Label htmlFor="project-title" className="font-medium">
            Title
          </Label>
          <Input
            id="project-title"
            name="project-title"
            placeholder="Project title"
            className="mt-2"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="project-slug" className="font-medium">
            Slug
          </Label>
          <Input
            id="project-slug"
            name="project-slug"
            placeholder="Project slug"
            className="mt-2"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="project-description" className="font-medium">
            Description
          </Label>
          <Textarea
            id="project-description"
            name="project-description"
            placeholder="Project description"
            className="mt-2"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="project-link" className="font-medium">
            Link
          </Label>
          <Input
            id="project-link"
            name="project-link"
            placeholder="Project link"
            className="mt-2"
            type="url"
          />
        </div>
        <Button asChild>
          <input type="submit" value="Save project" className="btn" />
        </Button>
      </form>
    </div>
  )
}