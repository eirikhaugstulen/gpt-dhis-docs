create policy "Enable insert for all users"
on "public"."conversations"
as permissive
for insert
to public
with check (true);




