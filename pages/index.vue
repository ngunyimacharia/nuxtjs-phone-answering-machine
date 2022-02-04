<template>
  <div>
    <!-- This example requires Tailwind CSS v2.0+ -->
<div class="py-16 min-h-screen bg-gray-50 overflow-hidden lg:py-24">
  <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
    <svg class="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4" width="404" height="784" fill="none" viewBox="0 0 404 784" aria-hidden="true">
      <defs>
        <pattern id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="404" height="784" fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
    </svg>

    <div class="relative">
      <h2 class="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Phone answering machine
        </h2>
      <p class="my-5 max-w-3xl mx-auto text-center text-md text-gray-500">
        Call the phone number +1 864 740 4616 to create a recording.
      </p>
      <p class="my-5 max-w-3xl mx-auto text-center text-md text-gray-500">
        You may use <a href="http://www.talkyou.me/en/index.html">TalkU</a> to call if you're not based in the US.
      </p>
    </div>

    <svg class="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12" width="404" height="784" fill="none" viewBox="0 0 404 784" aria-hidden="true">
      <defs>
        <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="404" height="784" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
    </svg>

    <div class="mt-20 mx-auto max-w-3xl bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="recording in recordings" :key="recording.public_id">
            <div class="flex items-center px-4 py-4 sm:px-6">
              <div class="min-w-0 flex-1 flex items-center">
                <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <p class="text-sm font-medium text-indigo-600 truncate">
                      Recording from {{recording.context.custom.From}} 
                      ({{recording.context.custom.FromCountry}} {{recording.context.custom.FromCity}})
                      </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500">
                      <span class="truncate">
                        {{recording.created_at}}
                      </span>
                    </p>
                  </div>
                  <div class="hidden md:block">
                    <div>
                          <audio
                            controls
                            :src="recording.secure_url"
                          >
                                Your browser does not support the
                                <code>audio</code> element.
                        </audio>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </li>
      </ul>
    </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  async asyncData () {
    const url = `${process.env.NUXT_ENV_BASE_URL}/api/list`;

    const recordings = await fetch(url)
      .then(response => response.json())
      .then(data => data.resources);

    console.log(recordings);

    return {recordings};
  }
}
</script>
