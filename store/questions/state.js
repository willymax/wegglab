const state = () => ({
  list: [],
  CURRENT_QUESTION: {},
  questions: [
    {
      id: 8,
      user_id: 7,
      body: 'Nihil dolorem perspiciatis id eaque nihil quisquam modi qui. Laudantium amet voluptas rerum nam. Ut provident molestiae qui similique repudiandae nulla. Minus nobis eos aliquam et.',
      views: 0,
      image:
        'https://via.placeholder.com/640x480.png/009922?text=solution+omnis',
      slug: 'autem-totam-rerum-aspernatur-error',
      active: false,
      featured: true,
      createdAt: '2021-09-27T21:59:15.000000Z',
      updatedAt: '2021-09-27T21:59:15.000000Z',
    },
    {
      id: 9,
      user_id: 11,
      body: 'Eligendi commodi molestiae dolores alias molestias reiciendis. Est quidem quibusdam consequatur aut eaque molestiae. Nesciunt aut odit nihil quam ipsum facilis nihil non. Est nemo sint sint assumenda quia blanditiis tenetur. Et error et occaecati odit assumenda facere. Inventore temporibus repudiandae dicta vero. Ex accusantium perferendis modi asperiores beatae nihil nulla.',
      views: 4,
      image:
        'https://via.placeholder.com/640x480.png/006688?text=solution+dignissimos',
      slug: 'quis-aut-beatae-eos-aut-atque-est',
      active: true,
      featured: false,
      createdAt: '2021-09-27T21:59:15.000000Z',
      updatedAt: '2021-09-27T21:59:15.000000Z',
    },
    {
      id: 10,
      user_id: 8,
      body: 'Maxime error similique aut ut quis ratione. Odit nam magnam ipsum in quam. Dolorem ea dolores repellendus autem consequatur autem quaerat. Ducimus amet optio modi velit qui ipsum. Ut non sed aut quia et sit.',
      views: 6,
      image:
        'https://via.placeholder.com/640x480.png/000000?text=solution+quam',
      slug: 'vitae-quia-et-amet-aliquam-sit',
      active: true,
      featured: true,
      createdAt: '2021-09-27T21:59:15.000000Z',
      updatedAt: '2021-09-27T21:59:15.000000Z',
    },
    {
      id: 11,
      user_id: 9,
      body: 'Laudantium ipsam iure et eum qui voluptatem quia. Possimus qui aut illum repellat repudiandae architecto. Velit reiciendis sit dolore id dolor. Velit omnis ipsa nisi nostrum. Et assumenda omnis dolore ullam.',
      views: 1,
      image:
        'https://via.placeholder.com/640x480.png/005500?text=solution+voluptas',
      slug: 'qui-dolore-officiis-nam',
      active: true,
      featured: true,
      createdAt: '2021-09-27T21:59:15.000000Z',
      updatedAt: '2021-09-27T21:59:15.000000Z',
    },
    {
      id: 12,
      user_id: 9,
      body: 'Quis commodi voluptate corrupti. Eum voluptatum voluptatem sunt iure. Unde aliquam rerum maiores aut atque veniam. Optio quae dolor eveniet. Illo accusantium incidunt porro. Quibusdam nihil vel nobis est facere quis est. Recusandae non dolorem laboriosam rerum eius voluptatem architecto. Accusamus aspernatur vel assumenda ullam a ducimus minima.',
      views: 4,
      image:
        'https://via.placeholder.com/640x480.png/005544?text=solution+voluptatibus',
      slug: 'et-sunt-commodi-sapiente-error-itaque-consectetur',
      active: true,
      featured: true,
      createdAt: '2021-09-27T21:59:15.000000Z',
      updatedAt: '2021-09-27T21:59:15.000000Z',
    },
    {
      id: 13,
      user_id: 9,
      body: 'Ut odit ut reprehenderit qui rem. Velit delectus odio ut nihil voluptatem mollitia. Quisquam ea tenetur minima. Sapiente et voluptatem sed accusamus. Molestiae provident itaque voluptatem neque. Non nesciunt aut et aut vero.',
      views: 6,
      image:
        'https://via.placeholder.com/640x480.png/002266?text=solution+nihil',
      slug: 'sunt-sunt-error-odit-consequatur-esse',
      active: true,
      featured: true,
      createdAt: '2021-09-27T21:59:15.000000Z',
      updatedAt: '2021-09-27T21:59:15.000000Z',
    },
    {
      id: 14,
      user_id: 8,
      body: 'Ipsam repellat recusandae consequuntur dolor. Non eum sed nesciunt autem unde. Animi consequatur dolores quod dignissimos. Non ducimus asperiores molestias voluptas. Laudantium cumque accusamus laborum deserunt quasi similique ut. Quisquam ipsam dolorem minus omnis repudiandae. Non unde labore voluptas rerum necessitatibus.',
      views: 0,
      image:
        'https://via.placeholder.com/640x480.png/00bbee?text=solution+blanditiis',
      slug: 'provident-repellendus-cumque-suscipit-quia-nihil',
      active: true,
      featured: false,
      createdAt: '2021-09-27T21:59:15.000000Z',
      updatedAt: '2021-09-27T21:59:15.000000Z',
    },
    {
      id: 15,
      user_id: 11,
      body: 'Aliquam ea quas incidunt fugiat. Velit minima modi itaque esse fugit. Aliquam cumque reiciendis non harum illum reiciendis a magni. Natus eos cumque cum. Quasi eum omnis occaecati cumque voluptates consectetur itaque. Iste culpa voluptatibus ullam provident.',
      views: 1,
      image:
        'https://via.placeholder.com/640x480.png/0099cc?text=solution+perspiciatis',
      slug: 'id-dolorum-consequatur-quos-voluptatem-et',
      active: false,
      featured: true,
      createdAt: '2021-09-27T21:59:15.000000Z',
      updatedAt: '2021-09-27T21:59:15.000000Z',
    },
    {
      id: 16,
      user_id: 2,
      body: 'Dolorum voluptatem eius cupiditate amet corporis molestiae. Sapiente eligendi doloribus accusantium ad quod quibusdam. Voluptates tempora qui et. Ad velit minima sint ad. Et quasi eum provident dolores. Voluptatibus quis voluptas cupiditate. Tempora velit magnam consequuntur tenetur dicta sequi nesciunt.',
      views: 2,
      image: 'https://via.placeholder.com/640x480.png/00aabb?text=solution+et',
      slug: 'eum-nesciunt-sed-cumque-placeat',
      active: false,
      featured: true,
      createdAt: '2021-09-27T21:59:15.000000Z',
      updatedAt: '2021-09-27T21:59:15.000000Z',
    },
    {
      id: 17,
      user_id: 6,
      body: 'Qui est qui exercitationem corporis soluta enim. Eos non alias reprehenderit quos fugiat atque magnam ullam. Quos est omnis culpa sit. Voluptatem consectetur dolor qui ducimus sint temporibus quae voluptatem. Necessitatibus laudantium consectetur mollitia tempore earum. Eos temporibus sed tempora magnam illum illum.',
      views: 9,
      image:
        'https://via.placeholder.com/640x480.png/00ee77?text=solution+velit',
      slug: 'qui-suscipit-quidem-qui-facilis',
      active: false,
      featured: true,
      createdAt: '2021-09-27T21:59:15.000000Z',
      updatedAt: '2021-09-27T21:59:15.000000Z',
    },
    {
      id: 18,
      user_id: 3,
      body: 'Ab eum ea eaque ea. Laborum sunt animi est excepturi non rerum. Eum earum assumenda dolorem enim laborum modi excepturi. Voluptatem vel ipsa impedit rerum. Ut qui atque est. Non placeat est deserunt recusandae consectetur. Voluptas unde fugiat incidunt praesentium sit non placeat.',
      views: 9,
      image:
        'https://via.placeholder.com/640x480.png/0044ff?text=solution+debitis',
      slug: 'est-illum-consequatur-earum-veniam-maxime-aut',
      active: false,
      featured: true,
      createdAt: '2021-10-02T20:22:29.000000Z',
      updatedAt: '2021-10-02T20:22:29.000000Z',
    },
    {
      id: 19,
      user_id: 3,
      body: 'Perspiciatis officiis voluptatem officiis voluptas omnis quia unde quis. Culpa incidunt vitae ipsum temporibus voluptatem corporis. Et nobis aut laborum soluta voluptatem et. Animi sint suscipit voluptatem blanditiis labore. Sed soluta non omnis dolores molestiae iure saepe.',
      views: 8,
      image:
        'https://via.placeholder.com/640x480.png/0077ee?text=solution+nihil',
      slug: 'id-velit-sunt-enim-id',
      active: true,
      featured: true,
      createdAt: '2021-10-02T20:22:29.000000Z',
      updatedAt: '2021-10-02T20:22:29.000000Z',
    },
    {
      id: 20,
      user_id: 2,
      body: 'Tempore facere non expedita aut. Recusandae culpa reiciendis sapiente est. Ipsam dolor iste autem voluptas. Est nesciunt aut et aut eaque ut voluptatem molestiae. Dolorum aliquid necessitatibus est quos incidunt id. Est fugit aut inventore doloribus quae voluptas. Voluptas deserunt quia consectetur doloremque omnis eum voluptatem quod.',
      views: 4,
      image:
        'https://via.placeholder.com/640x480.png/002299?text=solution+laborum',
      slug: 'doloremque-facilis-voluptatem-velit',
      active: true,
      featured: false,
      createdAt: '2021-10-02T20:22:29.000000Z',
      updatedAt: '2021-10-02T20:22:29.000000Z',
    },
    {
      id: 21,
      user_id: 10,
      body: 'Ut aut repellat autem a. Nulla at animi et inventore officia non. Explicabo laborum amet autem non vero consequatur aut. Voluptate quae et vitae id. Aperiam vel qui dicta voluptatem. Quo corporis commodi omnis sint iusto quaerat rem. Modi ipsum aut quis aut voluptatum quibusdam pariatur quaerat.',
      views: 5,
      image:
        'https://via.placeholder.com/640x480.png/00ff99?text=solution+facere',
      slug: 'qui-sit-molestias-a-autem-recusandae',
      active: true,
      featured: false,
      createdAt: '2021-10-02T20:22:29.000000Z',
      updatedAt: '2021-10-02T20:22:29.000000Z',
    },
    {
      id: 22,
      user_id: 5,
      body: 'Laborum voluptas architecto quam quidem iure quo nesciunt. Voluptates ipsam nostrum quam quaerat magni deserunt. Accusantium dolore a assumenda non quisquam magnam. Dolorem ab fugit voluptates aliquam eius libero excepturi. Molestiae sed voluptatem aut tenetur molestiae eveniet. Ullam quos iure libero rerum.',
      views: 4,
      image: 'https://via.placeholder.com/640x480.png/00cc66?text=solution+ex',
      slug: 'eius-velit-hic-rem-modi-in-libero',
      active: false,
      featured: true,
      createdAt: '2021-10-02T20:22:30.000000Z',
      updatedAt: '2021-10-02T20:22:30.000000Z',
    },
    {
      id: 23,
      user_id: 5,
      body: 'Dicta cupiditate repudiandae commodi doloribus voluptate saepe commodi. Et rem et et illum nulla quis. Exercitationem non commodi qui voluptatem. Exercitationem neque enim voluptatem vel. Quo non voluptatibus sunt recusandae.',
      views: 3,
      image:
        'https://via.placeholder.com/640x480.png/00aa88?text=solution+consequatur',
      slug: 'voluptatum-omnis-aut-quia',
      active: false,
      featured: false,
      createdAt: '2021-10-02T20:22:30.000000Z',
      updatedAt: '2021-10-02T20:22:30.000000Z',
    },
    {
      id: 24,
      user_id: 3,
      body: 'Est rerum et corrupti id. Ab accusamus omnis natus. Culpa quia voluptatem optio. Est asperiores nihil iusto aut asperiores ipsa et. Mollitia voluptate placeat non esse. Odit laborum nulla dolorem est rerum.',
      views: 9,
      image: 'https://via.placeholder.com/640x480.png/009988?text=solution+sit',
      slug: 'rerum-assumenda-omnis-repellat-ad',
      active: false,
      featured: false,
      createdAt: '2021-10-02T20:22:30.000000Z',
      updatedAt: '2021-10-02T20:22:30.000000Z',
    },
    {
      id: 25,
      user_id: 10,
      body: 'Sit laudantium corrupti consequatur est. Sit deserunt voluptatem numquam odio maiores id et officiis. Aut cupiditate voluptas eaque qui pariatur et repudiandae. Sapiente et ratione et voluptatem. Qui nihil quod dolorem deleniti consequatur velit suscipit.',
      views: 3,
      image:
        'https://via.placeholder.com/640x480.png/004444?text=solution+ratione',
      slug: 'impedit-rerum-est-deserunt',
      active: false,
      featured: true,
      createdAt: '2021-10-02T20:22:30.000000Z',
      updatedAt: '2021-10-02T20:22:30.000000Z',
    },
    {
      id: 26,
      user_id: 7,
      body: 'Maiores iusto occaecati ea beatae sed. Cupiditate dignissimos iure vel. Non voluptatum laudantium suscipit id. At natus corporis neque ut ut et laborum et. Et dolorem laboriosam laudantium rerum eligendi enim consequatur. Laboriosam enim laboriosam molestias facilis. Magni autem ab accusantium dolorum autem repellendus.',
      views: 6,
      image: 'https://via.placeholder.com/640x480.png/00ddee?text=solution+non',
      slug: 'molestias-non-necessitatibus-sunt-minima',
      active: false,
      featured: false,
      createdAt: '2021-10-02T20:22:30.000000Z',
      updatedAt: '2021-10-02T20:22:30.000000Z',
    },
    {
      id: 27,
      user_id: 10,
      body: 'Iste voluptas ut velit repellat omnis ea quod. Eos omnis officiis unde. Eos commodi ipsum ut autem. Vel non error ratione perspiciatis accusamus. Accusantium fugit aut qui aut non. Esse accusantium recusandae et optio corrupti laudantium qui voluptatum. Soluta vitae delectus placeat minima.',
      views: 8,
      image:
        'https://via.placeholder.com/640x480.png/00aa33?text=solution+enim',
      slug: 'nisi-esse-exercitationem-vel',
      active: false,
      featured: true,
      createdAt: '2021-10-02T20:22:30.000000Z',
      updatedAt: '2021-10-02T20:22:30.000000Z',
    },
    {
      id: 28,
      user_id: 4,
      body: 'the body of the question',
      views: 0,
      image: null,
      slug: 'twdsdsd',
      active: true,
      featured: false,
      createdAt: '2021-10-11T10:25:52.000000Z',
      updatedAt: '2021-10-11T10:25:52.000000Z',
    },
    {
      id: 29,
      user_id: 11,
      body: 'the body of the question',
      views: 0,
      image: null,
      slug: '',
      active: true,
      featured: false,
      createdAt: '2021-10-11T10:38:20.000000Z',
      updatedAt: '2021-10-11T10:38:20.000000Z',
    },
    {
      id: 30,
      user_id: 11,
      body: 'the body of the question',
      views: 0,
      image: null,
      slug: 'test-question-11s',
      active: true,
      featured: false,
      createdAt: '2021-10-11T11:17:31.000000Z',
      updatedAt: '2021-10-11T11:17:31.000000Z',
    },
    {
      id: 31,
      user_id: 11,
      body: 'the body of the question',
      views: 0,
      image: null,
      slug: 'test-question-1s1s',
      active: true,
      featured: false,
      createdAt: '2021-10-11T11:25:43.000000Z',
      updatedAt: '2021-10-11T11:25:43.000000Z',
    },
    {
      id: 32,
      user_id: 11,
      body: 'the body of the question',
      views: 0,
      image: null,
      slug: 'test-question-1ss1s',
      active: true,
      featured: false,
      createdAt: '2021-10-11T11:26:22.000000Z',
      updatedAt: '2021-10-11T11:26:22.000000Z',
    },
    {
      id: 33,
      user_id: 11,
      body: 'the body of the question',
      views: 0,
      image: null,
      slug: 'test-question-3',
      active: true,
      featured: false,
      createdAt: '2021-10-11T13:49:20.000000Z',
      updatedAt: '2021-10-11T13:49:20.000000Z',
    },
    {
      id: 34,
      user_id: 11,
      body: 'the body of the question',
      views: 0,
      image: null,
      slug: 'test-question-4',
      active: true,
      featured: false,
      createdAt: '2021-10-11T14:02:04.000000Z',
      updatedAt: '2021-10-11T14:02:04.000000Z',
    },
    {
      id: 35,
      user_id: 11,
      body: 'the body of the question',
      views: 0,
      image: null,
      slug: 'test-question-5',
      active: true,
      featured: false,
      createdAt: '2021-10-11T14:02:53.000000Z',
      updatedAt: '2021-10-11T14:02:53.000000Z',
    },
  ],
})
export default state
