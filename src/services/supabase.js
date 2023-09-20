
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://dkpnhokvlrztfafbtwip.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcG5ob2t2bHJ6dGZhZmJ0d2lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2OTg1NTIsImV4cCI6MjAwODI3NDU1Mn0.iYyKoROHl_JaaL8qWmp5Xk6X16LEsPj6C0B7PsvlRGM'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase