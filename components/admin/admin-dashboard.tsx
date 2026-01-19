"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { LogOut, Plus, Edit, Trash2, Briefcase, GraduationCap, Code, ArrowUp, ArrowDown, ArrowUpDown, Home, Mail, CheckCircle2, FolderKanban, X } from "lucide-react"
import Link from "next/link"
import { availableIcons } from "@/lib/icon-mapper"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface AdminDashboardProps {
  onLogout: () => void
}

interface Experience {
  id: string
  period: string
  company: string
  position: string
  location: string
  sort_order?: number
}

interface Education {
  id: string
  period: string
  institution: string
  degree: string
  location: string
  sort_order?: number
}

interface Skill {
  id: string
  name: string
  categories: string[] // Array of categories
  icon_name: string | null
  sort_order?: number
  display_order?: number // Legacy field, kept for backward compatibility
}

interface Contact {
  id: string
  name: string
  email: string
  message: string
  created_at: string
  read: boolean
}

interface Project {
  id: string
  title: string
  description: string
  short_description?: string
  gallery: string[]
  technologies: string[]
  year: string
  github_url?: string
  live_url?: string
  sort_order?: number
  created_at?: string
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [educations, setEducations] = useState<Education[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  // Experience state
  const [expDialogOpen, setExpDialogOpen] = useState(false)
  const [editingExp, setEditingExp] = useState<Experience | null>(null)
  const [expForm, setExpForm] = useState({ period: "", company: "", position: "", location: "" })

  // Education state
  const [eduDialogOpen, setEduDialogOpen] = useState(false)
  const [editingEdu, setEditingEdu] = useState<Education | null>(null)
  const [eduForm, setEduForm] = useState({ period: "", institution: "", degree: "", location: "" })

  // Skills state
  const [skillDialogOpen, setSkillDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [skillForm, setSkillForm] = useState({ name: "", categories: ["frontend"] as string[], icon_name: "" })
  const [reorderingSkill, setReorderingSkill] = useState(false)
  const [customIconInput, setCustomIconInput] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteType, setDeleteType] = useState<"experience" | "education" | "skill" | "contact" | "project" | null>(null)

  // Projects state
  const [projectDialogOpen, setProjectDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    short_description: "",
    gallery: [] as string[],
    technologies: [] as string[],
    year: new Date().getFullYear().toString(),
    github_url: "",
    live_url: "",
  })
  const [reorderingProject, setReorderingProject] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null)
  const [dragOverImageIndex, setDragOverImageIndex] = useState<number | null>(null)

  // Sorting state
  const [expSortOrder, setExpSortOrder] = useState<"asc" | "desc" | null>(null)
  const [eduSortOrder, setEduSortOrder] = useState<"asc" | "desc" | null>(null)
  const [reordering, setReordering] = useState(false)
  
  // Tab state
  const [activeTab, setActiveTab] = useState<"experience" | "education" | "skills" | "contacts" | "projects">("experience")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [expRes, eduRes, skillsRes, contactsRes, projectsRes] = await Promise.all([
        fetch("/api/admin/experience"),
        fetch("/api/admin/education"),
        fetch("/api/admin/skills"),
        fetch("/api/admin/contacts"),
        fetch("/api/admin/projects"),
      ])

      if (expRes.ok) {
        const data = await expRes.json()
        setExperiences(data)
      }
      if (eduRes.ok) {
        const data = await eduRes.json()
        setEducations(data)
      }
      if (skillsRes.ok) {
        const data = await skillsRes.json()
        console.log('Fetched skills data:', data)
        // Ensure categories is always an array
        const normalizedSkills = data.map((skill: any) => ({
          ...skill,
          categories: Array.isArray(skill.categories) ? skill.categories : []
        }))
        console.log('Normalized skills:', normalizedSkills)
        setSkills(normalizedSkills)
      }
      if (contactsRes.ok) {
        const data = await contactsRes.json()
        console.log('Fetched contacts:', data)
        setContacts(data || [])
      }
      if (projectsRes.ok) {
        const data = await projectsRes.json()
        console.log('Fetched projects:', data)
        // Ensure arrays are properly formatted
        const normalizedProjects = data.map((project: any) => ({
          ...project,
          gallery: Array.isArray(project.gallery) ? project.gallery : [],
          technologies: Array.isArray(project.technologies) ? project.technologies : [],
        }))
        setProjects(normalizedProjects || [])
      } else {
        const errorText = await contactsRes.text()
        console.error('Failed to fetch contacts:', contactsRes.status, errorText)
        if (contactsRes.status === 401) {
          console.error('Unauthorized - check admin session cookie')
        }
        // Don't show error toast for 401, just log it
        if (contactsRes.status !== 401) {
          toast.error("Failed to fetch contacts")
        }
        setContacts([])
      }
    } catch (error) {
      toast.error("Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  // Experience handlers
  const handleExpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = "/api/admin/experience"
      const method = editingExp ? "PUT" : "POST"
      const body = editingExp ? { ...expForm, id: editingExp.id } : expForm

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        toast.success(editingExp ? "Experience updated!" : "Experience added!")
        setExpDialogOpen(false)
        setEditingExp(null)
        setExpForm({ period: "", company: "", position: "", location: "" })
        fetchData()
      } else {
        const data = await response.json()
        console.error('Experience save error:', data)
        toast.error(data.error || "Failed to save experience")
        if (data.details) {
          console.error('Details:', data.details)
        }
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  const handleExpEdit = (exp: Experience) => {
    setEditingExp(exp)
    setExpForm({ period: exp.period, company: exp.company, position: exp.position, location: exp.location })
    setExpDialogOpen(true)
  }

  const handleExpDelete = async () => {
    if (!deleteId) return
    try {
      const response = await fetch(`/api/admin/experience?id=${deleteId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Experience deleted!")
        setDeleteId(null)
        setDeleteType(null)
        fetchData()
      } else {
        toast.error("Failed to delete experience")
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  // Education handlers
  const handleEduSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = "/api/admin/education"
      const method = editingEdu ? "PUT" : "POST"
      const body = editingEdu ? { ...eduForm, id: editingEdu.id } : eduForm

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        toast.success(editingEdu ? "Education updated!" : "Education added!")
        setEduDialogOpen(false)
        setEditingEdu(null)
        setEduForm({ period: "", institution: "", degree: "", location: "" })
        fetchData()
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to save education")
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  const handleEduEdit = (edu: Education) => {
    setEditingEdu(edu)
    setEduForm({ period: edu.period, institution: edu.institution, degree: edu.degree, location: edu.location })
    setEduDialogOpen(true)
  }

  const handleEduDelete = async () => {
    if (!deleteId) return
    try {
      const response = await fetch(`/api/admin/education?id=${deleteId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Education deleted!")
        setDeleteId(null)
        setDeleteType(null)
        fetchData()
      } else {
        toast.error("Failed to delete education")
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  // Reorder handlers
  const handleReorderExp = async (id: string, direction: "up" | "down") => {
    if (reordering) return
    setReordering(true)
    try {
      const response = await fetch("/api/admin/experience/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, direction }),
      })

      if (response.ok) {
        toast.success("Order updated!")
        fetchData()
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to reorder")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setReordering(false)
    }
  }

  const handleReorderEdu = async (id: string, direction: "up" | "down") => {
    if (reordering) return
    setReordering(true)
    try {
      const response = await fetch("/api/admin/education/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, direction }),
      })

      if (response.ok) {
        toast.success("Order updated!")
        fetchData()
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to reorder")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setReordering(false)
    }
  }

  // Skills reorder handler
  const handleReorderSkill = async (id: string, direction: "up" | "down") => {
    if (reorderingSkill) return
    setReorderingSkill(true)
    try {
      const response = await fetch("/api/admin/skills/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, direction }),
      })

      if (response.ok) {
        toast.success("Order updated!")
        fetchData()
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to reorder")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setReorderingSkill(false)
    }
  }

  // Skills handlers
  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (skillForm.categories.length === 0) {
      toast.error("Please select at least one category")
      return
    }
    
    try {
      const url = "/api/admin/skills"
      const method = editingSkill ? "PUT" : "POST"
      
      // Prepare body, converting "none" icon_name to empty string
      const iconName = skillForm.icon_name === "none" ? "" : (skillForm.icon_name || "")
      const body = editingSkill
        ? { ...skillForm, id: editingSkill.id, categories: skillForm.categories, icon_name: iconName }
        : { ...skillForm, categories: skillForm.categories, icon_name: iconName }

      console.log('Submitting skill:', body)

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        toast.success(editingSkill ? "Skill updated!" : "Skill added!")
        setSkillDialogOpen(false)
        setEditingSkill(null)
        setSkillForm({ name: "", categories: ["frontend"], icon_name: "" })
        fetchData()
      } else {
        let errorMessage = "Failed to save skill"
        try {
          const data = await response.json()
          console.error('Skill save error response:', data)
          errorMessage = data.error || errorMessage
          if (data.details) {
            console.error('Error details:', data.details)
            errorMessage += ` - ${data.details}`
          }
        } catch (parseError) {
          const text = await response.text()
          console.error('Failed to parse error response:', text)
          errorMessage = `Server error: ${response.status} ${response.statusText}`
        }
        toast.error(errorMessage)
      }
    } catch (error: any) {
      console.error('Skill submit error:', error)
      console.error('Error details:', {
        message: error?.message,
        stack: error?.stack,
        name: error?.name
      })
      toast.error(error?.message || "An error occurred")
    }
  }

  const handleSkillEdit = (skill: Skill) => {
    setEditingSkill(skill)
    // Ensure categories is always an array
    const categoriesArray = Array.isArray(skill.categories) 
      ? skill.categories 
      : []
    console.log('Editing skill:', skill, 'Categories array:', categoriesArray)
    setSkillForm({
      name: skill.name,
      categories: categoriesArray,
      icon_name: skill.icon_name || "",
    })
    setSkillDialogOpen(true)
  }

  const handleSkillDelete = async () => {
    if (!deleteId) return
    try {
      const response = await fetch(`/api/admin/skills?id=${deleteId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Skill deleted!")
        setDeleteId(null)
        setDeleteType(null)
        fetchData()
      } else {
        const data = await response.json()
        console.error('Skill delete error:', data)
        toast.error(data.error || "Failed to delete skill")
      }
    } catch (error: any) {
      console.error('Skill delete error:', error)
      toast.error(error.message || "An error occurred")
    }
  }

  // Contact handlers
  const handleContactToggleRead = async (contact: Contact) => {
    try {
      const response = await fetch("/api/admin/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: contact.id, read: !contact.read }),
      })

      if (response.ok) {
        toast.success(contact.read ? "Marked as unread" : "Marked as read")
        fetchData()
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to update contact")
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred")
    }
  }

  const handleContactDelete = async () => {
    if (!deleteId) return
    try {
      const response = await fetch(`/api/admin/contacts?id=${deleteId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Contact deleted!")
        setDeleteId(null)
        setDeleteType(null)
        fetchData()
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to delete contact")
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred")
    }
  }

  const handleDelete = (id: string, type: "experience" | "education" | "skill") => {
    setDeleteId(id)
    setDeleteType(type)
  }

  // Project handlers
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validGallery = projectForm.gallery.filter(url => url && url.trim() !== "")
    if (validGallery.length === 0) {
      toast.error("Please add at least one gallery image")
      return
    }
    
    if (projectForm.technologies.length === 0) {
      toast.error("Please select at least one technology")
      return
    }
    
    try {
      const url = "/api/admin/projects"
      const method = editingProject ? "PUT" : "POST"
      
      const body = editingProject
        ? { ...projectForm, gallery: validGallery, id: editingProject.id }
        : { ...projectForm, gallery: validGallery }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        toast.success(editingProject ? "Project updated!" : "Project added!")
        setProjectDialogOpen(false)
        setEditingProject(null)
        setProjectForm({
          title: "",
          description: "",
          short_description: "",
          gallery: [""],
          technologies: [],
          year: new Date().getFullYear().toString(),
          github_url: "",
          live_url: "",
        })
        fetchData()
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to save project")
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred")
    }
  }

  const handleProjectEdit = (project: Project) => {
    setEditingProject(project)
    setProjectForm({
      title: project.title,
      description: project.description,
      short_description: project.short_description || "",
      gallery: project.gallery || [],
      technologies: project.technologies || [],
      year: project.year,
      github_url: project.github_url || "",
      live_url: project.live_url || "",
    })
    setProjectDialogOpen(true)
  }

  const handleProjectDelete = async () => {
    if (!deleteId) return
    try {
      const response = await fetch(`/api/admin/projects?id=${deleteId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Project deleted!")
        setDeleteId(null)
        setDeleteType(null)
        fetchData()
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to delete project")
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred")
    }
  }

  const handleReorderProject = async (id: string, direction: "up" | "down") => {
    if (reorderingProject) return
    setReorderingProject(true)

    const project = projects.find((p) => p.id === id)
    if (!project) return

    const currentIndex = projects.findIndex((p) => p.id === id)
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1

    if (newIndex < 0 || newIndex >= projects.length) {
      setReorderingProject(false)
      return
    }

    const targetProject = projects[newIndex]
    const newSortOrder = targetProject.sort_order || 0
    const currentSortOrder = project.sort_order || 0

    try {
      const response = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          ...project,
          sort_order: newSortOrder,
        }),
      })

      if (response.ok) {
        // Also update the target project
        await fetch("/api/admin/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: targetProject.id,
            ...targetProject,
            sort_order: currentSortOrder,
          }),
        })
        fetchData()
      } else {
        toast.error("Failed to reorder project")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setReorderingProject(false)
    }
  }

  const confirmDelete = () => {
    if (deleteType === "experience") handleExpDelete()
    else if (deleteType === "education") handleEduDelete()
    else if (deleteType === "skill") handleSkillDelete()
    else if (deleteType === "contact") handleContactDelete()
    else if (deleteType === "project") handleProjectDelete()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Link href="/">
              <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
                <Home className="mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button onClick={onLogout} variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
              <LogOut className="mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "experience" | "education" | "skills" | "contacts" | "projects")} className="w-full">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="experience" className="data-[state=active]:bg-white/10">
              <Briefcase className="mr-2" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-white/10">
              <GraduationCap className="mr-2" />
              Education
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-white/10">
              <Code className="mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-white/10">
              <FolderKanban className="mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-white/10">
              <Mail className="mr-2" />
              Contacts
            </TabsTrigger>
          </TabsList>

          {/* Experience Tab */}
          <TabsContent value="experience" className="mt-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Work Experience</h2>
                <Dialog open={expDialogOpen} onOpenChange={setExpDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setEditingExp(null)
                        setExpForm({ period: "", company: "", position: "", location: "" })
                      }}
                      className="bg-white text-black hover:bg-white/90"
                    >
                      <Plus className="mr-2" />
                      Add Experience
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black border-white/10 text-white">
                    <DialogHeader>
                      <DialogTitle>{editingExp ? "Edit" : "Add"} Experience</DialogTitle>
                      <DialogDescription>Enter the experience details</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleExpSubmit}>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Period</Label>
                          <Input
                            value={expForm.period}
                            onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                            placeholder="Jan / 2023 – Current"
                            required
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input
                            value={expForm.company}
                            onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                            placeholder="Company Name"
                            required
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Position</Label>
                          <Input
                            value={expForm.position}
                            onChange={(e) => setExpForm({ ...expForm, position: e.target.value })}
                            placeholder="Job Title"
                            required
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input
                            value={expForm.location}
                            onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                            placeholder="Prishtina (Kosovo)"
                            required
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setExpDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-white text-black hover:bg-white/90">
                          {editingExp ? "Update" : "Add"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="w-20">Order</TableHead>
                    <TableHead>
                      <button
                        onClick={() => {
                          if (expSortOrder === null || expSortOrder === "desc") {
                            setExpSortOrder("asc")
                          } else {
                            setExpSortOrder("desc")
                          }
                        }}
                        className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                      >
                        Period
                        {expSortOrder === "asc" && <ArrowUp className="h-4 w-4" />}
                        {expSortOrder === "desc" && <ArrowDown className="h-4 w-4" />}
                        {expSortOrder === null && <ArrowUpDown className="h-4 w-4 opacity-50" />}
                      </button>
                    </TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...experiences].sort((a, b) => {
                    // First sort by sort_order if available
                    if (a.sort_order !== undefined && b.sort_order !== undefined) {
                      return a.sort_order - b.sort_order
                    }
                    // Then apply period sorting if enabled
                    if (expSortOrder !== null) {
                      const comparison = a.period.localeCompare(b.period)
                      return expSortOrder === "asc" ? comparison : -comparison
                    }
                    return 0
                  }).map((exp, index) => (
                    <TableRow key={exp.id} className="border-white/10">
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleReorderExp(exp.id, "up")}
                            disabled={reordering || index === 0}
                            className="h-6 w-6 p-0 hover:bg-white/10"
                            title="Move up"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleReorderExp(exp.id, "down")}
                            disabled={reordering || index === experiences.length - 1}
                            className="h-6 w-6 p-0 hover:bg-white/10"
                            title="Move down"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{exp.period}</TableCell>
                      <TableCell>{exp.company}</TableCell>
                      <TableCell>{exp.position}</TableCell>
                      <TableCell>{exp.location}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleExpEdit(exp)}
                            className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(exp.id, "experience")}
                            className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="mt-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Education</h2>
                <Dialog open={eduDialogOpen} onOpenChange={setEduDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setEditingEdu(null)
                        setEduForm({ period: "", institution: "", degree: "", location: "" })
                      }}
                      className="bg-white text-black hover:bg-white/90"
                    >
                      <Plus className="mr-2" />
                      Add Education
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black border-white/10 text-white">
                    <DialogHeader>
                      <DialogTitle>{editingEdu ? "Edit" : "Add"} Education</DialogTitle>
                      <DialogDescription>Enter the education details</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEduSubmit}>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Period</Label>
                          <Input
                            value={eduForm.period}
                            onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                            placeholder="2018 - 2022"
                            required
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Institution</Label>
                          <Input
                            value={eduForm.institution}
                            onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                            placeholder="Institution Name"
                            required
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Degree</Label>
                          <Input
                            value={eduForm.degree}
                            onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                            placeholder="Bachelor Degree"
                            required
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input
                            value={eduForm.location}
                            onChange={(e) => setEduForm({ ...eduForm, location: e.target.value })}
                            placeholder="Prishtina (Kosovo)"
                            required
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setEduDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-white text-black hover:bg-white/90">
                          {editingEdu ? "Update" : "Add"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="w-20">Order</TableHead>
                    <TableHead>
                      <button
                        onClick={() => {
                          if (eduSortOrder === null || eduSortOrder === "desc") {
                            setEduSortOrder("asc")
                          } else {
                            setEduSortOrder("desc")
                          }
                        }}
                        className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                      >
                        Period
                        {eduSortOrder === "asc" && <ArrowUp className="h-4 w-4" />}
                        {eduSortOrder === "desc" && <ArrowDown className="h-4 w-4" />}
                        {eduSortOrder === null && <ArrowUpDown className="h-4 w-4 opacity-50" />}
                      </button>
                    </TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Degree</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...educations].sort((a, b) => {
                    // First sort by sort_order if available
                    if (a.sort_order !== undefined && b.sort_order !== undefined) {
                      return a.sort_order - b.sort_order
                    }
                    // Then apply period sorting if enabled
                    if (eduSortOrder !== null) {
                      const comparison = a.period.localeCompare(b.period)
                      return eduSortOrder === "asc" ? comparison : -comparison
                    }
                    return 0
                  }).map((edu, index) => (
                    <TableRow key={edu.id} className="border-white/10">
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleReorderEdu(edu.id, "up")}
                            disabled={reordering || index === 0}
                            className="h-6 w-6 p-0 hover:bg-white/10"
                            title="Move up"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleReorderEdu(edu.id, "down")}
                            disabled={reordering || index === educations.length - 1}
                            className="h-6 w-6 p-0 hover:bg-white/10"
                            title="Move down"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{edu.period}</TableCell>
                      <TableCell>{edu.institution}</TableCell>
                      <TableCell>{edu.degree}</TableCell>
                      <TableCell>{edu.location}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEduEdit(edu)}
                            className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(edu.id, "education")}
                            className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="mt-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Skills</h2>
                <Dialog open={skillDialogOpen} onOpenChange={setSkillDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setEditingSkill(null)
                        setSkillForm({ name: "", categories: ["frontend"], icon_name: "" })
                      }}
                      className="bg-white text-black hover:bg-white/90"
                    >
                      <Plus className="mr-2" />
                      Add Skill
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black border-white/10 text-white">
                    <DialogHeader>
                      <DialogTitle>{editingSkill ? "Edit" : "Add"} Skill</DialogTitle>
                      <DialogDescription>Enter the skill details</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSkillSubmit}>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input
                            value={skillForm.name}
                            onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                            placeholder="React"
                            required
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Categories (Select multiple)</Label>
                          <div className="flex flex-wrap gap-2">
                            {['frontend', 'backend', 'technologies'].map((cat) => {
                              const isSelected = skillForm.categories.includes(cat)
                              return (
                                <button
                                  key={cat}
                                  type="button"
                                  onClick={() => {
                                    if (isSelected) {
                                      setSkillForm({
                                        ...skillForm,
                                        categories: skillForm.categories.filter(c => c !== cat)
                                      })
                                    } else {
                                      setSkillForm({
                                        ...skillForm,
                                        categories: [...skillForm.categories, cat]
                                      })
                                    }
                                  }}
                                  className={`px-3 py-1 rounded-md text-sm transition-all ${
                                    isSelected
                                      ? 'bg-white text-black'
                                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                                  }`}
                                >
                                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                              )
                            })}
                          </div>
                          {skillForm.categories.length === 0 && (
                            <p className="text-red-400 text-xs">At least one category is required</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label>Icon</Label>
                          <div className="space-y-2">
                            <Select
                              value={(() => {
                                const predefinedIcons = ["SiHtml5", "SiCss3", "SiJavascript", "SiTypescript", "SiReact", "SiNextdotjs", "SiVuedotjs", "SiTailwindcss", "SiNodedotjs", "SiExpress", "JavaIcon", "SiPhp", "SiDotnet", "SiMongodb", "SiPostgresql", "SiMysql", "SiRedis", "SiWordpress", "SiShopify", "SiSupabase", "SiGit", "SiDocker", "SiFigma", "SiAccuweather", "SeoIcon"]
                                if (!skillForm.icon_name || skillForm.icon_name === "") return "none"
                                return predefinedIcons.includes(skillForm.icon_name) ? skillForm.icon_name : "none"
                              })()}
                              onValueChange={(value) => {
                                if (value === "none") {
                                  setSkillForm({ ...skillForm, icon_name: customIconInput || "" })
                                } else {
                                  setSkillForm({ ...skillForm, icon_name: value })
                                  setCustomIconInput("")
                                }
                              }}
                            >
                              <SelectTrigger className="bg-white/5 border-white/10 w-full">
                                <SelectValue placeholder="Select an icon (optional)" />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-white/10 max-h-[300px]">
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="SiHtml5">HTML 5</SelectItem>
                                <SelectItem value="SiCss3">CSS 3</SelectItem>
                                <SelectItem value="SiJavascript">JavaScript</SelectItem>
                                <SelectItem value="SiTypescript">TypeScript</SelectItem>
                                <SelectItem value="SiReact">React</SelectItem>
                                <SelectItem value="SiNextdotjs">Next.js</SelectItem>
                                <SelectItem value="SiVuedotjs">Vue.js</SelectItem>
                                <SelectItem value="SiTailwindcss">Tailwind CSS</SelectItem>
                                <SelectItem value="SiNodedotjs">Node.js</SelectItem>
                                <SelectItem value="SiExpress">Express</SelectItem>
                                <SelectItem value="JavaIcon">Java (Custom)</SelectItem>
                                <SelectItem value="SiPhp">PHP</SelectItem>
                                <SelectItem value="SiDotnet">.NET Core</SelectItem>
                                <SelectItem value="SiMongodb">MongoDB</SelectItem>
                                <SelectItem value="SiPostgresql">PostgreSQL</SelectItem>
                                <SelectItem value="SiMysql">MySQL</SelectItem>
                                <SelectItem value="SiRedis">Redis</SelectItem>
                                <SelectItem value="SiWordpress">WordPress</SelectItem>
                                <SelectItem value="SiShopify">Shopify</SelectItem>
                                <SelectItem value="SiSupabase">Supabase</SelectItem>
                                <SelectItem value="SiGit">Git</SelectItem>
                                <SelectItem value="SiDocker">Docker</SelectItem>
                                <SelectItem value="SiFigma">Figma</SelectItem>
                                <SelectItem value="SiAccuweather">Accuweather</SelectItem>
                                <SelectItem value="SeoIcon">SEO</SelectItem>
                              </SelectContent>
                            </Select>
                            <div className="text-xs text-white/60 flex items-center gap-2">
                              <span>OR</span>
                              <div className="flex-1 h-px bg-white/10"></div>
                            </div>
                            <Input
                              value={customIconInput}
                              onChange={(e) => {
                                const customIcon = e.target.value
                                setCustomIconInput(customIcon)
                                setSkillForm({ ...skillForm, icon_name: customIcon.trim() || "" })
                              }}
                              placeholder="Enter custom icon name (e.g., SiPython, SiGo)"
                              className="bg-white/5 border-white/10"
                            />
                            <p className="text-xs text-white/50">
                              Enter icon name from react-icons/si (e.g., SiPython, SiGo, SiRust). 
                              Make sure to add it to icon-mapper.tsx for it to display.
                            </p>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setSkillDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-white text-black hover:bg-white/90">
                          {editingSkill ? "Update" : "Add"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="w-20">Order</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Icon</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skills.map((skill, index) => (
                    <TableRow key={skill.id} className="border-white/10">
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleReorderSkill(skill.id, "up")}
                            disabled={reorderingSkill || index === 0}
                            className="h-6 w-6 p-0 hover:bg-white/10"
                            title="Move up"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleReorderSkill(skill.id, "down")}
                            disabled={reorderingSkill || index === skills.length - 1}
                            className="h-6 w-6 p-0 hover:bg-white/10"
                            title="Move down"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{skill.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(skill.categories) ? skill.categories : []).map((cat) => (
                            <span key={cat} className="px-2 py-1 bg-white/10 rounded text-xs capitalize">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{skill.icon_name || "-"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSkillEdit(skill)}
                            className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(skill.id, "skill")}
                            className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="mt-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Projects</h2>
                <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => {
                      setEditingProject(null)
                      setProjectForm({
                        title: "",
                        description: "",
                        short_description: "",
                        gallery: [],
                        technologies: [],
                        year: new Date().getFullYear().toString(),
                        github_url: "",
                        live_url: "",
                      })
                    }} className="bg-white text-black hover:bg-white/90">
                      <Plus className="mr-2" />
                      Add Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black border-white/10 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingProject ? "Edit Project" : "Add Project"}</DialogTitle>
                      <DialogDescription>
                        {editingProject ? "Update project details" : "Add a new project to your portfolio"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleProjectSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Title *</Label>
                          <Input
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            className="bg-white/5 border-white/10 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Year *</Label>
                          <Input
                            type="text"
                            value={projectForm.year}
                            onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                            className="bg-white/5 border-white/10 text-white"
                            placeholder="2024"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Description *</Label>
                        <textarea
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          className="w-full min-h-[100px] p-2 bg-white/5 border border-white/10 rounded text-white"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Short Description (optional)</Label>
                        <Input
                          value={projectForm.short_description}
                          onChange={(e) => setProjectForm({ ...projectForm, short_description: e.target.value })}
                          className="bg-white/5 border-white/10 text-white"
                          placeholder="Brief description for card view"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Gallery Images *</Label>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={async (e) => {
                                const files = e.target.files
                                if (!files || files.length === 0) return

                                setUploadingImages(true)
                                try {
                                  const formData = new FormData()
                                  Array.from(files).forEach((file) => {
                                    formData.append("files", file)
                                  })

                                  const response = await fetch("/api/admin/upload", {
                                    method: "POST",
                                    body: formData,
                                  })

                                  if (response.ok) {
                                    const data = await response.json()
                                    setProjectForm({
                                      ...projectForm,
                                      gallery: [...projectForm.gallery.filter(url => url !== ""), ...data.files]
                                    })
                                    toast.success(`${data.files.length} image(s) uploaded successfully`)
                                  } else {
                                    const error = await response.json()
                                    toast.error(error.error || "Failed to upload images")
                                  }
                                } catch (error: any) {
                                  toast.error("An error occurred while uploading")
                                } finally {
                                  setUploadingImages(false)
                                  // Reset file input
                                  e.target.value = ""
                                }
                              }}
                              className="bg-white/5 border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-white/90 cursor-pointer"
                              disabled={uploadingImages}
                            />
                            {uploadingImages && (
                              <span className="text-sm text-white/60">Uploading...</span>
                            )}
                          </div>

                          {/* Image Preview Grid */}
                          {projectForm.gallery.filter(url => url !== "").length > 0 && (
                            <div className="grid grid-cols-3 gap-3 mt-3">
                              {projectForm.gallery.filter(url => url !== "").map((imageUrl, index) => {
                                const validGallery = projectForm.gallery.filter(url => url !== "")
                                return (
                                  <div
                                    key={`${imageUrl}-${index}`}
                                    draggable
                                    onDragStart={(e) => {
                                      setDraggedImageIndex(index)
                                      e.dataTransfer.effectAllowed = "move"
                                    }}
                                    onDragOver={(e) => {
                                      e.preventDefault()
                                      e.dataTransfer.dropEffect = "move"
                                      setDragOverImageIndex(index)
                                    }}
                                    onDragLeave={() => {
                                      setDragOverImageIndex(null)
                                    }}
                                    onDrop={(e) => {
                                      e.preventDefault()
                                      if (draggedImageIndex === null || draggedImageIndex === index) {
                                        setDraggedImageIndex(null)
                                        setDragOverImageIndex(null)
                                        return
                                      }

                                      // Reorder the gallery array
                                      const reorderedGallery = [...validGallery]
                                      const [draggedItem] = reorderedGallery.splice(draggedImageIndex, 1)
                                      reorderedGallery.splice(index, 0, draggedItem)

                                      // Map back to full gallery array
                                      const fullGallery = [...projectForm.gallery]
                                      let validIndex = 0
                                      const newFullGallery = fullGallery.map(url => {
                                        if (url === "") return url
                                        const newUrl = reorderedGallery[validIndex]
                                        validIndex++
                                        return newUrl
                                      })

                                      setProjectForm({
                                        ...projectForm,
                                        gallery: newFullGallery
                                      })

                                      setDraggedImageIndex(null)
                                      setDragOverImageIndex(null)
                                      toast.success("Image order updated")
                                    }}
                                    onDragEnd={() => {
                                      setDraggedImageIndex(null)
                                      setDragOverImageIndex(null)
                                    }}
                                    className={`relative group cursor-move transition-all ${
                                      draggedImageIndex === index ? "opacity-50 scale-95" : ""
                                    } ${
                                      dragOverImageIndex === index && draggedImageIndex !== index
                                        ? "ring-2 ring-blue-500 scale-105"
                                        : ""
                                    }`}
                                  >
                                    <img
                                      src={imageUrl}
                                      alt={`Preview ${index + 1}`}
                                      className="w-full h-24 object-cover rounded border border-white/10 pointer-events-none"
                                    />
                                    <div className="absolute top-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded text-[10px] font-medium">
                                      {index + 1}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={async (e) => {
                                        e.stopPropagation()
                                        const validIndices = projectForm.gallery
                                          .map((url, idx) => url !== "" ? idx : -1)
                                          .filter(idx => idx !== -1)
                                        const actualIndex = validIndices[index]
                                        
                                        try {
                                          const response = await fetch(`/api/admin/delete-image?path=${encodeURIComponent(imageUrl)}`, {
                                            method: "DELETE",
                                          })

                                          if (response.ok) {
                                            setProjectForm({
                                              ...projectForm,
                                              gallery: projectForm.gallery.filter((_, i) => i !== actualIndex)
                                            })
                                            toast.success("Image deleted")
                                          } else {
                                            setProjectForm({
                                              ...projectForm,
                                              gallery: projectForm.gallery.filter((_, i) => i !== actualIndex)
                                            })
                                            toast.error("Image removed from form (file may still exist)")
                                          }
                                        } catch (error) {
                                          setProjectForm({
                                            ...projectForm,
                                            gallery: projectForm.gallery.filter((_, i) => i !== actualIndex)
                                          })
                                          toast.error("Image removed from form")
                                        }
                                      }}
                                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                      title="Delete image"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                )
                              })}
                            </div>
                          )}

                          <p className="text-xs text-white/50">
                            Upload images to /public/projects folder. Images will be automatically saved.
                            <br />
                            <span className="text-white/40">💡 Drag images to reorder them</span>
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Technologies (Icon Names) *</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {projectForm.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="bg-white/10 text-white">
                              {tech}
                              <button
                                type="button"
                                onClick={() => {
                                  setProjectForm({
                                    ...projectForm,
                                    technologies: projectForm.technologies.filter((_, i) => i !== index)
                                  })
                                }}
                                className="ml-2 hover:text-red-400"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <Select
                          onValueChange={(value) => {
                            if (!projectForm.technologies.includes(value)) {
                              setProjectForm({
                                ...projectForm,
                                technologies: [...projectForm.technologies, value]
                              })
                            }
                          }}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select technology icon" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-white/10 text-white max-h-[200px]">
                            {availableIcons.map((icon) => (
                              <SelectItem key={icon.value} value={icon.value}>
                                {icon.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-white/50">Select from available icons or type custom icon name</p>
                        <Input
                          placeholder="Or type custom icon name (e.g., SiPython)"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.currentTarget.value) {
                              e.preventDefault()
                              const value = e.currentTarget.value.trim()
                              if (value && !projectForm.technologies.includes(value)) {
                                setProjectForm({
                                  ...projectForm,
                                  technologies: [...projectForm.technologies, value]
                                })
                                e.currentTarget.value = ""
                              }
                            }
                          }}
                          className="bg-white/5 border-white/10 text-white mt-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>GitHub URL (optional)</Label>
                          <Input
                            type="url"
                            value={projectForm.github_url}
                            onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                            className="bg-white/5 border-white/10 text-white"
                            placeholder="https://github.com/username/repo"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Live URL (optional)</Label>
                          <Input
                            type="url"
                            value={projectForm.live_url}
                            onChange={(e) => setProjectForm({ ...projectForm, live_url: e.target.value })}
                            className="bg-white/5 border-white/10 text-white"
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setProjectDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-white text-black hover:bg-white/90">
                          {editingProject ? "Update" : "Add"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="w-20">Order</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Technologies</TableHead>
                    <TableHead>Gallery</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-white/60">
                        No projects yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    projects.map((project, index) => (
                      <TableRow key={project.id} className="border-white/10">
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleReorderProject(project.id, "up")}
                              disabled={reorderingProject || index === 0}
                              className="h-6 w-6 p-0 hover:bg-white/10"
                              title="Move up"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleReorderProject(project.id, "down")}
                              disabled={reorderingProject || index === projects.length - 1}
                              className="h-6 w-6 p-0 hover:bg-white/10"
                              title="Move down"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell>{project.year}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs bg-white/10">
                                {tech.replace('Si', '')}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="secondary" className="text-xs bg-white/10">
                                +{project.technologies.length - 3}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-white/60 text-sm">
                            {project.gallery?.length || 0} image{project.gallery?.length !== 1 ? 's' : ''}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleProjectEdit(project)}
                              className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setDeleteId(project.id)
                                setDeleteType("project")
                              }}
                              className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="mt-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Contact Messages</h2>
                <div className="text-sm text-white/60">
                  {contacts.filter(c => !c.read).length} unread
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead>Status</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-white/60">
                        No contacts yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    contacts.map((contact) => (
                      <TableRow 
                        key={contact.id} 
                        className={`border-white/10 ${!contact.read ? 'bg-white/5' : ''}`}
                      >
                        <TableCell>
                          {contact.read ? (
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell className="max-w-md truncate">{contact.message}</TableCell>
                        <TableCell>
                          {new Date(contact.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleContactToggleRead(contact)}
                              className={`bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white ${
                                contact.read ? 'text-yellow-400 hover:text-yellow-300' : 'text-green-400 hover:text-green-300'
                              }`}
                            >
                              {contact.read ? "Mark Unread" : "Mark Read"}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setDeleteId(contact.id)
                                setDeleteType("contact")
                              }}
                              className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-black border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this {deleteType}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

