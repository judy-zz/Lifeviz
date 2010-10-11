# NOTE: selenium is required to run log_in
def log_in(user)
  visit root_path
  if page.has_content?("Log out")
    click_link "Log out"
  end
  click 'Log in'
  fill_in 'user_email'    ,:with => user.email
  fill_in 'user_password' ,:with => "password"
  click 'Login'
end

def make_biological_classification(rank = 5)
  return false if rank < -1 || 5 < rank
  if Taxon.find_by_rank(rank) 
    make_biological_classification(rank - 1)
  else
    parent_id = make_biological_classification(rank - 1)
    taxon = Taxon.create(
      :rank => rank.to_i,
      :parent_id => parent_id,
      :lineage_ids => (parent_id == false ? "1" : Taxon.find(parent_id).lineage_ids+",#{parent_id+1}"),
      :name => Faker::Name.first_name
    )
    return taxon.id
  end
end