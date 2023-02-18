const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const seller1 = await prisma.seller.upsert({
    where: { email: 'seller1@prisma.io' },
    update: {},
    create: {
      name: 'Seller1',
      email:'seller1@prisma.io',
      books: {
        create: {
          name: "book1",
          count: 1,
        },
      },
    },
  })

  const seller2 = await prisma.seller.upsert({
    where: { email: 'seller2@prisma.io' },
    update: {},
    create: {
      name: 'Seller2',
      email:'seller2@prisma.io',
      books: {
        create: {
          name: "book2",
          count: 1,
        },
      },
    },
  })
  console.log({ seller1, seller2 })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })