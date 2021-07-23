import { StateContainer } from '@ezy/makina';
import { setupDevtoolsPlugin } from '@vue/devtools-api';

const INSPECTOR_ID = 'makina-inspector';

export function setupDevtools(app: StateContainer<any, any>) {
  setupDevtoolsPlugin(
    {
      id: 'vue-makina-devtools-plugin',
      label: 'vue makina',
      packageName: '@ezy/vue-makina',
      homepage: 'https://github.com/ezylean/vue-makina',
      app,
    },
    (api) => {
      api.addInspector({
        id: INSPECTOR_ID,
        label: app.constructor.name,
        icon: 'account-tree',
      });

      api.on.getInspectorTree((payload) => {
        if (payload.inspectorId === INSPECTOR_ID) {
          payload.rootNodes = [
            {
              id: 'root',
              label: `Root (time)`,
              children: [
                {
                  id: 'child',
                  label: `Child ${payload.filter}`,
                  tags: [
                    {
                      label: 'active',
                      textColor: 0x000000,
                      backgroundColor: 0xff984f,
                    },
                    {
                      label: 'test',
                      textColor: 0xffffff,
                      backgroundColor: 0x000000,
                    },
                  ],
                },
              ],
            },
          ];
        }
      });
    }
  );
}
