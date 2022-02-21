<template>
  <div class="launcher">
    <div class="launcher-inner">
      <div class="launcher-shell-selector">
        <p class="launcher-shell-selector-title">
          Generated shell script
        </p>
        <div
          v-for="delimeterOption in delimeterOptions"
          :key="delimeterOption.value"
          class="form-check form-check-inline"
        >
          <input
            :id="'delimeterOption' + delimeterOption.value"
            v-model="delimeter"
            class="form-check-input"
            type="radio"
            name="delimeter"
            :value="delimeterOption.value"
          >
          <label
            class="form-check-label"
            :for="'delimeterOption' + delimeterOption.value"
          >{{ delimeterOption.text }}</label>
        </div>
      </div>
      <div class="launcher-script">
        <code>{{ cmdLine }}</code>
        <button
          type="button"
          class="btn btn-outline-primary btn-sm launcher-script-btn-clipboard"
          @click="copyScriptToClipboard"
        >
          Copy
        </button>
      </div>
      <div class="launcher-panel">
        <button
          type="button"
          class="btn btn-primary"
          @click="launchVm"
        >
          Launch VM
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { SHELL_NEW_LINE_DELIMETERS } from '../enums';

export default {
    name: 'VmLauncher',
    data() {
        return {
            delimeterOptions: SHELL_NEW_LINE_DELIMETERS,
            delimeter: SHELL_NEW_LINE_DELIMETERS[0].value,
        };
    },
    computed: {
        config() {
            return this.$store.state.vm.config;
        },
        cmdArgs() {
            const config = this.config;

            return [
                'qemu-system-x86_64',
                `-accel ${config.acceleration}`,
                `-smp ${config.cpu.cores}`,
                `-m ${config.memory}G`,
                config.cdrom.path ? `-cdrom "${config.cdrom.path}"` : '',
                config.drive.path ? `-drive "file=${config.drive.path},format=qcow2"` : '',
                `-vga ${config.graphics.card}`,
                `-boot order=${config.bootDevice},menu=on`,
                config.networking.enabled ? '-net nic,model=e1000 -net user' : '',
                config.audio.enabled ? '-soundhw hda': '',
                '-usbdevice tablet',
                ...(config.spiceAgent.enabled
                    ? [
                        '-device virtio-serial',
                        '-chardev spicevmc,id=vdagent,debug=0,name=vdagent',
                        '-device virtserialport,chardev=vdagent,name=com.redhat.spice.0',
                    ]
                    : []),
                config.spiceServer.enabled
                    ? `-spice port=${config.spiceServer.port},password=${config.spiceServer.password}`
                    : '',
            ];
        },
        cmdLine() {
            return this.cmdArgs
                .filter((arg) => arg.trim().length > 0)
                .join(` ${this.delimeter}\n`);
        },
    },
    methods: {
        copyScriptToClipboard() {
            navigator.clipboard.writeText(this.cmdLine);
        },
        launchVm() {
            const args = JSON.parse(JSON.stringify(this.cmdArgs));

            electron.vmManager.launchVm(args.slice(1)); // eslint-disable-line
        },
    },
};
</script>

<style>
.launcher {
  position: relative;
  height: 100%;
}

.launcher-inner {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 1rem;
  height: 100%;
  overflow: hidden;
}

.launcher-shell-selector-title {
  margin-bottom: 0.5rem;
}

.launcher-script {
  position: relative;
  display: flex;
  overflow: hidden;
  flex-grow: 1;
}

.launcher-script code {
  white-space: pre;
  overflow: auto;
  width: 100%;
}

.launcher-script-btn-clipboard {
  position: absolute;
  top: 0.65rem;
  right: 0.65rem;
  z-index: 10;
  display: block;
  opacity: 0.5;
  padding: 0.25rem 0.5rem;
  font-size: 0.65em;
  color: #0d6efd;
  background-color: #fff;
  border: 1px solid;
  border-radius: 0.25rem;
}

.launcher-script-btn-clipboard:hover {
  opacity: 1;
}

.launcher-panel {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}
</style>