
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_requests ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Creators policies
CREATE POLICY "Anyone can view verified creators" ON creators FOR SELECT USING (is_verified = true);
CREATE POLICY "Creators can view their own profile" ON creators FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Creators can update their own profile" ON creators FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Creators can insert their own profile" ON creators FOR INSERT WITH CHECK (auth.uid() = id);

-- Brands policies
CREATE POLICY "Anyone can view verified brands" ON brands FOR SELECT USING (is_verified = true);
CREATE POLICY "Brands can view their own profile" ON brands FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Brands can update their own profile" ON brands FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Brands can insert their own profile" ON brands FOR INSERT WITH CHECK (auth.uid() = id);

-- Campaigns policies
CREATE POLICY "Anyone can view active campaigns" ON campaigns FOR SELECT USING (status = 'active');
CREATE POLICY "Brands can view their own campaigns" ON campaigns FOR SELECT USING (auth.uid() = brand_id);
CREATE POLICY "Brands can create campaigns" ON campaigns FOR INSERT WITH CHECK (auth.uid() = brand_id);
CREATE POLICY "Brands can update their own campaigns" ON campaigns FOR UPDATE USING (auth.uid() = brand_id);

-- Campaign applications policies
CREATE POLICY "Creators can view their own applications" ON campaign_applications FOR SELECT USING (auth.uid() = creator_id);
CREATE POLICY "Brands can view applications to their campaigns" ON campaign_applications FOR SELECT USING (
    auth.uid() = (SELECT brand_id FROM campaigns WHERE id = campaign_id)
);
CREATE POLICY "Creators can create applications" ON campaign_applications FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Brands can update applications to their campaigns" ON campaign_applications FOR UPDATE USING (
    auth.uid() = (SELECT brand_id FROM campaigns WHERE id = campaign_id)
);

-- Messages policies
CREATE POLICY "Users can view their own messages" ON messages FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id
);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update their own messages" ON messages FOR UPDATE USING (auth.uid() = sender_id);

-- Creator requests policies (admin only)
CREATE POLICY "Admins can manage creator requests" ON creator_requests FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can view their own creator request" ON creator_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own creator request" ON creator_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Brand requests policies (admin only)
CREATE POLICY "Admins can manage brand requests" ON brand_requests FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can view their own brand request" ON brand_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own brand request" ON brand_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
