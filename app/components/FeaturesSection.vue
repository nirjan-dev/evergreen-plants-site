<template>
  <div class="bg-neutral-200 py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-3 gap-8">
        <UPageCard
          title="Quality Plants"
          description="Healthy, well-cared-for plants selected with love"
          icon="i-heroicons-check-badge"
          variant="soft"
          spotlight
          :ui="{
            leadingIcon: 'size-20',
            title: 'text-2xl',
            container: 'items-center  text-center',
            wrapper: ' items-center',
          }"
        />

        <UPageCard
          title="Local Delivery"
          description="Convenient delivery across and near Jhapa district"
          icon="i-heroicons-truck"
          variant="soft"
          spotlight
          :ui="{
            leadingIcon: 'size-20',
            title: 'text-2xl',
            container: 'items-center  text-center',
            wrapper: ' items-center',
          }"
        />

        <UPageCard
          title="Expert Care"
          description="Free care tips and support for your plants "
          icon="i-heroicons-question-mark-circle"
          variant="soft"
          spotlight
          :ui="{
            leadingIcon: 'size-20',
            title: 'text-2xl',
            container: 'items-center  text-center',
            wrapper: ' items-center',
          }"
        />
      </div>
    </div>
  </div>
</template>
