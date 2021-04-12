import * as Identity from "@spica-devkit/identity";

export async function createIdentity(change) {
    Identity.initialize({ apikey: `${process.env.IDENTITY_SECRET_KEY}` });
    const author = change.current;
    const password = "spica";

    // The password is standard for now.
    // You can apply the auth asset.
    // After that, don't remember to change some configurations related to the auth asset.

    let identity = await Identity.insert({
        identifier: author.email,
        password: password,
        policies: ["BucketFullAccess"]
    });

    return identity ? true : false;
}

export async function deleteIdentity(change) {
    Identity.initialize({ apikey: `${process.env.IDENTITY_SECRET_KEY}` });

    const author = change.previous;

    const identity = await Identity.getAll({ filter: { identifier: author.email } }).then(
        data => (data = data[0])
    );
    if (identity) {
        await Identity.remove(identity._id);
        return true;
    }
    return false;
}
