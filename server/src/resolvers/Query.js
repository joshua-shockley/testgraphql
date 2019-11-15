async function feed(parent, args, context) {
    const count = await context.prisma
        .linksConnection({
            where: {
                OR: [
                    { description_contains: args.filter },
                    { url_contains: args.filter },
                ],
            },
        })
        .aggregate()
        .count()
    const links = await context.prisma.links({
        where: {
            OR: [
                { description_contains: args.filter },
                { url_contains: args.filter },
            ],
        },
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy,
    })
    return {
        count,
        links,
    }
}
//my attempt at putting item by id into the query items to pull up a view of the individual item/person/link
async function allUsers(parent, args, context, info) {
    return context.prisma.users()
}

function oneLink(parent, args, context, info) {
    return context.prisma.link({ id: args.id })
}

function oneUser(parent, args, context, info) {
    return context.prisma.user({ id: args.id })
}

module.exports = {
    feed,
    allUsers,
    oneLink,
    oneUser,
}