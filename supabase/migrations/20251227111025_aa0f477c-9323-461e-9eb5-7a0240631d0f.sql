-- Create enum for application roles
CREATE TYPE public.app_role AS ENUM ('admin', 'recruiter', 'candidate');

-- Create enum for verification status
CREATE TYPE public.verification_status AS ENUM ('pending', 'approved', 'rejected');

-- Create enum for application status
CREATE TYPE public.application_status AS ENUM ('pending', 'reviewed', 'shortlisted', 'interviewed', 'offered', 'rejected', 'withdrawn');

-- Create enum for job status
CREATE TYPE public.job_status AS ENUM ('draft', 'active', 'paused', 'closed', 'expired');

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  profile_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create candidate_profiles table
CREATE TABLE public.candidate_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  resume_url TEXT,
  skills TEXT[] DEFAULT '{}',
  custom_skills TEXT[] DEFAULT '{}',
  experience_years INTEGER DEFAULT 0,
  education TEXT,
  location TEXT,
  bio TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create recruiter_profiles table
CREATE TABLE public.recruiter_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  company_name TEXT NOT NULL,
  ntn_number TEXT,
  company_logo_url TEXT,
  company_website TEXT,
  company_description TEXT,
  company_address TEXT,
  documents_url TEXT,
  verification_status verification_status DEFAULT 'pending',
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID REFERENCES auth.users(id),
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities TEXT,
  requirements TEXT,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  experience_required INTEGER DEFAULT 0,
  skills_required TEXT[] DEFAULT '{}',
  deadline TIMESTAMP WITH TIME ZONE,
  status job_status DEFAULT 'draft',
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create interview_slots table
CREATE TABLE public.interview_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  slot_date DATE NOT NULL,
  slot_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  is_booked BOOLEAN DEFAULT false,
  booked_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  candidate_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recruiter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  interview_slot_id UUID REFERENCES public.interview_slots(id),
  resume_url TEXT NOT NULL,
  cover_letter TEXT,
  status application_status DEFAULT 'pending',
  ai_feedback TEXT,
  ai_score INTEGER,
  notes TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (job_id, candidate_id)
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_name TEXT NOT NULL,
  plan_type TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  billing_cycle TEXT DEFAULT 'monthly',
  jobs_limit INTEGER DEFAULT 5,
  applications_limit INTEGER DEFAULT 50,
  is_active BOOLEAN DEFAULT true,
  starts_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create admin_logs table
CREATE TABLE public.admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruiter_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role app_role;
BEGIN
  -- Get role from metadata or default to candidate
  user_role := COALESCE(
    (NEW.raw_user_meta_data->>'role')::app_role,
    'candidate'::app_role
  );
  
  -- Insert user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, user_role);
  
  -- Insert base profile
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  -- Create role-specific profile
  IF user_role = 'candidate' THEN
    INSERT INTO public.candidate_profiles (user_id)
    VALUES (NEW.id);
  ELSIF user_role = 'recruiter' THEN
    INSERT INTO public.recruiter_profiles (user_id, company_name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'company_name', 'Company'));
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create update triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_candidate_profiles_updated_at
  BEFORE UPDATE ON public.candidate_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_recruiter_profiles_updated_at
  BEFORE UPDATE ON public.recruiter_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for user_roles
CREATE POLICY "Users can view own role"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for candidate_profiles
CREATE POLICY "Candidates can view own profile"
  ON public.candidate_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Candidates can update own profile"
  ON public.candidate_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Recruiters can view candidate profiles for their jobs"
  ON public.candidate_profiles FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'recruiter') AND
    EXISTS (
      SELECT 1 FROM public.applications a
      WHERE a.candidate_id = candidate_profiles.user_id
      AND a.recruiter_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all candidate profiles"
  ON public.candidate_profiles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for recruiter_profiles
CREATE POLICY "Recruiters can view own profile"
  ON public.recruiter_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Recruiters can update own profile"
  ON public.recruiter_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view verified recruiters"
  ON public.recruiter_profiles FOR SELECT
  TO anon, authenticated
  USING (verification_status = 'approved');

CREATE POLICY "Admins can view all recruiter profiles"
  ON public.recruiter_profiles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update recruiter profiles"
  ON public.recruiter_profiles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for jobs
CREATE POLICY "Anyone can view active jobs"
  ON public.jobs FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

CREATE POLICY "Recruiters can view own jobs"
  ON public.jobs FOR SELECT
  TO authenticated
  USING (auth.uid() = recruiter_id);

CREATE POLICY "Recruiters can create jobs"
  ON public.jobs FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = recruiter_id AND
    public.has_role(auth.uid(), 'recruiter')
  );

CREATE POLICY "Recruiters can update own jobs"
  ON public.jobs FOR UPDATE
  TO authenticated
  USING (auth.uid() = recruiter_id);

CREATE POLICY "Recruiters can delete own jobs"
  ON public.jobs FOR DELETE
  TO authenticated
  USING (auth.uid() = recruiter_id);

CREATE POLICY "Admins can manage all jobs"
  ON public.jobs FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for interview_slots
CREATE POLICY "Anyone can view available slots for active jobs"
  ON public.interview_slots FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.jobs j
      WHERE j.id = interview_slots.job_id
      AND j.status = 'active'
    )
  );

CREATE POLICY "Recruiters can manage slots for own jobs"
  ON public.interview_slots FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.jobs j
      WHERE j.id = interview_slots.job_id
      AND j.recruiter_id = auth.uid()
    )
  );

CREATE POLICY "Candidates can book slots"
  ON public.interview_slots FOR UPDATE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'candidate') AND
    is_booked = false
  );

-- RLS Policies for applications
CREATE POLICY "Candidates can view own applications"
  ON public.applications FOR SELECT
  TO authenticated
  USING (auth.uid() = candidate_id);

CREATE POLICY "Candidates can create applications"
  ON public.applications FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = candidate_id AND
    public.has_role(auth.uid(), 'candidate')
  );

CREATE POLICY "Recruiters can view applications for their jobs"
  ON public.applications FOR SELECT
  TO authenticated
  USING (auth.uid() = recruiter_id);

CREATE POLICY "Recruiters can update applications for their jobs"
  ON public.applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = recruiter_id);

CREATE POLICY "Admins can view all applications"
  ON public.applications FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all subscriptions"
  ON public.subscriptions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for admin_logs
CREATE POLICY "Admins can view logs"
  ON public.admin_logs FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create logs"
  ON public.admin_logs FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for resumes and documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('company-documents', 'company-documents', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for resumes
CREATE POLICY "Candidates can upload own resume"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'resumes' AND
    public.has_role(auth.uid(), 'candidate') AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Candidates can view own resume"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'resumes' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Recruiters can view resumes from applications"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'resumes' AND
    public.has_role(auth.uid(), 'recruiter')
  );

-- Storage policies for company documents
CREATE POLICY "Recruiters can upload company documents"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'company-documents' AND
    public.has_role(auth.uid(), 'recruiter') AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Recruiters can view own documents"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'company-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Admins can view all documents"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'company-documents' AND
    public.has_role(auth.uid(), 'admin')
  );

-- Storage policies for avatars
CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );