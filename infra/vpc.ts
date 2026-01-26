export const Vpc = ["dev", "staging"].includes($app.stage)
  ? null
  : new sst.aws.Vpc("SupabaseVPC", {
      az: 1,
      nat: "ec2",
    });
