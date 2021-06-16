 const runner = new ScriptRunnerImpl(this.http, this.content, 'en');
    if (this.responseMessage == 'success') {
      this.response =
        'Thank you very much. <a class="aquestion" href="' +
        this.URL +
        '">Click here</a> to join the live video chat meeting via Microsoft Teams. <p class="pTagMargin"> Please note that this video chat link will only be available for 5 minutes</p>';
      this.finalMsg = {
        s: [
          {
            description: 'Final message json',
            name: 'Final Msg script',
            snippets: [
              {
                name: 'default',
                steps: [
                  {
                    say: this.response,
                    uid: 'edd5f2d88a',
                  },
                ],
                uid: '954fa806b0',
              },
            ],
          },
        ],
      };
    } else if (this.responseMessage == 'error') {
      this.response = 'Agent not available, we will reach you shortly';
      this.finalMsg = {
        s: [
          {
            description: 'Final message json',
            name: 'Final Msg script',
            snippets: [
              {
                name: 'default',
                steps: [
                  {
                    say: this.response,
                    uid: 'edd5f2d88a',
                  },
                ],
                uid: '954fa806b0',
              },
            ],
          },
        ],
      };
    }

    runner.registerCustomComponents([
      {
        keyword: 'img',
      },
    ]);
    runner.debug = true;
    runner.timeout = 2;
    runner
      .run(
        this.finalMsg,
        0,
        {},
        (key, value) => {
          console.log('SETTING', key, '<==', value);
        },
        {}
      )
      .subscribe(() => {
        console.log('done!');
      });
