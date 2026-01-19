export const Vpc = new sst.aws.Vpc("SupabaseVPC", {
  az: 1,
  nat: "ec2",
});
