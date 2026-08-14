const appState = {
    
    // --- Interactive Terminal Logic (Mission Control) ---
    initTerminal: function() {
        const input = document.getElementById('terminal-input');
        if(!input) return;
        
        const welcomeText = [
            "Deep Space Network // Uplink Terminal",
            "Access Level: UNAUTHORIZED",
            "",
            "To view the Mission Critical Infrastructure portfolio, you must authorize this session.",
            "Type 'help' for command protocols."
        ];
        
        this.typeText('interactive-terminal-content', welcomeText, () => {
            input.focus();
        });
        
        document.querySelector('.terminal-window').addEventListener('click', () => {
            input.focus();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = input.value.trim().toLowerCase();
                input.value = '';
                
                if(cmd !== '') {
                    this.printToTerminal(`flight-director@mission-control:~$ ${cmd}`, 'var(--text-main)');
                    this.handleCommand(cmd);
                }
            }
        });
    },

    printToTerminal: function(text, color = 'var(--success)') {
        const content = document.getElementById('interactive-terminal-content');
        const div = document.createElement('div');
        div.style.color = color;
        div.innerHTML = text;
        content.appendChild(div);
        content.scrollTop = content.scrollHeight;
    },

    handleCommand: function(cmd) {
        const content = document.getElementById('interactive-terminal-content');
        
        switch(cmd) {
            case 'help':
                this.printToTerminal(`Available Protocols:<br>
  <span style="color:var(--primary-light)">whoami</span>   - Identify current uplink user<br>
  <span style="color:var(--primary-light)">specs</span>    - List engineering specifications<br>
  <span style="color:var(--primary-light)">clear</span>    - Clear terminal buffer<br>
  <span style="color:var(--accent); font-weight: bold;">launch</span>   - Authorize session and initiate portfolio telemetry`);
                break;
            case 'whoami':
                this.printToTerminal("guest (unauthorized flight-director)");
                break;
            case 'specs':
            case 'skills':
                this.printToTerminal(`Engineering Specifications:<br>
  - Kubernetes / RKE2 / K3s Container Orchestration<br>
  - Terraform & Ansible (Orbital Infrastructure)<br>
  - GitLab CI/CD (Automated Payload Delivery)<br>
  - Prometheus & Grafana (Deep Space Telemetry)<br>
  - Linux Systems Engineering`);
                break;
            case 'clear':
                content.innerHTML = '';
                break;
            case 'launch':
            case 'deploy':
            case 'sudo launch':
                const inputLine = document.querySelector('.terminal-input-line');
                if(inputLine) inputLine.style.display = 'none';
                this.simulateBootSequence();
                break;
            default:
                this.printToTerminal(`bash: ${cmd}: command not found. Type 'help'.`, 'var(--danger)');
        }
    },

    simulateBootSequence: function() {
        const lines = [
            "",
            "> Initiating launch sequence...",
            "Authenticating flight director: Asghar Ahmed",
            "Authentication successful.",
            "Establishing connection to Deep Space Network...",
            "Mounting cluster contexts (RKE2, K3s)...",
            "Receiving telemetry from observability stack (Prometheus/Grafana)...",
            "Systems nominal. Access granted.",
            "Unlocking mission logs..."
        ];
        
        let currentLine = 0;
        const content = document.getElementById('interactive-terminal-content');
        
        const typeNextLine = () => {
            if(currentLine >= lines.length) {
                setTimeout(() => {
                    this.unlockPortfolio();
                }, 800);
                return;
            }
            
            const div = document.createElement('div');
            div.style.color = 'var(--success)';
            content.appendChild(div);
            
            let charIndex = 0;
            const typeChar = () => {
                if(charIndex < lines[currentLine].length) {
                    div.innerHTML += lines[currentLine].charAt(charIndex);
                    content.scrollTop = content.scrollHeight;
                    charIndex++;
                    setTimeout(typeChar, Math.random() * 20 + 10);
                } else {
                    currentLine++;
                    setTimeout(typeNextLine, 300);
                }
            };
            typeChar();
        };
        typeNextLine();
    },

    unlockPortfolio: function() {
        const terminalSection = document.getElementById('terminal-landing');
        
        terminalSection.classList.add('unlocked');
        document.body.classList.remove('locked');
    },

    // --- Terminal Typer Utility (Used for other sections) ---
    typeText: async function(elementId, lines, callback) {
        const el = document.getElementById(elementId);
        el.innerHTML = '';
        
        for(let i=0; i<lines.length; i++) {
            const line = document.createElement('div');
            el.appendChild(line);
            
            for(let j=0; j<lines[i].length; j++) {
                line.innerHTML += lines[i].charAt(j);
                el.scrollTop = el.scrollHeight;
                await new Promise(r => setTimeout(r, Math.random() * 15 + 5));
            }
            await new Promise(r => setTimeout(r, 200));
        }
        if(callback) callback();
    },

    // --- Terraform / IaC Provisioning ---
    simulateVMProvision: function() {
        const btn = document.querySelector('#expertise button');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Applying Protocol...';
        
        const lines = [
            "$ terraform apply -auto-approve",
            "libvirt_domain.prod_node: Creating...",
            "libvirt_domain.prod_node: Creation complete after 14s [id=67b4c8]",
            "",
            "Apply complete! Resources: 1 added, 0 changed, 0 destroyed.",
            "Outputs:",
            "  prod_node_ip = \"10.20.10.21\""
        ];
        
        this.typeText('vm-terminal-output', lines, () => {
            btn.innerHTML = '<i class="fas fa-check"></i> Provisioned Successfully';
            btn.classList.replace('primary-btn', 'outline-btn');
            btn.style.borderColor = 'var(--success)';
            btn.style.color = 'var(--success)';
        });
    },

    // --- CI/CD Pipeline (Payload Delivery) ---
    simulatePipeline: function() {
        const btn = document.getElementById('cicd-btn');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Triggering Payload...';
        
        const stages = document.querySelectorAll('.stage');
        
        const lines = [
            "Running with gitlab-runner 16.2.0 (Mission Control)",
            "Preparing the \"docker\" executor",
            "$ docker login -u $CI_REGISTRY_USER -p ***",
            "Login Succeeded",
            "$ docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA .",
            "Step 1/6 : FROM alpine:3.18",
            " ---> 7e01a0d0a1dc",
            "Step 6/6 : CMD [\"/app/server\"]",
            "Successfully built 91b8a34",
            "Successfully tagged registry.gitlab.com/org/app:7d8f9",
            "$ docker push registry.gitlab.com/org/app:7d8f9",
            "Payload delivery succeeded"
        ];
        
        this.typeText('cicd-terminal-output', lines, () => {});
        
        let currentStage = 0;
        const runStage = () => {
            if(currentStage >= stages.length) {
                btn.innerHTML = '<i class="fas fa-check"></i> Deployed';
                btn.classList.replace('primary-btn', 'outline-btn');
                btn.style.borderColor = 'var(--success)';
                btn.style.color = 'var(--success)';
                return;
            }
            
            stages[currentStage].classList.add('running');
            
            setTimeout(() => {
                stages[currentStage].classList.remove('running');
                stages[currentStage].classList.add('success');
                currentStage++;
                runStage();
            }, 800 + Math.random() * 1000); 
        };
        runStage();
    },

    // --- Incident Simulation (Telemetry Anomaly) ---
    triggerIncident: function() {
        const btn = document.getElementById('incident-btn');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Resolving Anomaly...';
        
        const latCard = document.getElementById('chart-lat').parentElement;
        const latMetric = document.getElementById('metric-latency');
        const latChart = document.getElementById('chart-lat');
        const workflowEl = document.getElementById('incident-workflow');
        
        latCard.classList.add('incident');
        latMetric.innerText = '680 ms';
        latChart.classList.add('incident');
        document.getElementById('metric-err').innerText = '1.45%';
        document.getElementById('metric-err').classList.add('text-red');
        document.getElementById('monitoring-status-badge').innerText = 'ANOMALY DETECTED';
        document.getElementById('monitoring-status-badge').classList.replace('healthy', 'critical');
        
        workflowEl.innerHTML = '';
        
        const steps = [
            "Alertmanager: HighLatencyWarning (web-app > 500ms)",
            "Diagnostic: CPU saturation detected on web-app deployment.",
            "Action: Horizontal Pod Autoscaler (HPA) triggering scale-up.",
            "New pods registered with Ingress. Rebalancing traffic...",
            "Telemetry normalizing. Current: 82ms"
        ];
        
        let currentStep = 0;
        const runStep = () => {
            if (currentStep >= steps.length) {
                latCard.classList.remove('incident');
                latMetric.innerText = '82 ms';
                latChart.classList.remove('incident');
                document.getElementById('metric-err').innerText = '0.01%';
                document.getElementById('metric-err').classList.remove('text-red');
                document.getElementById('monitoring-status-badge').innerText = 'NOMINAL';
                document.getElementById('monitoring-status-badge').classList.replace('critical', 'healthy');
                
                btn.innerHTML = '<i class="fas fa-check"></i> System Stabilized';
                btn.classList.replace('warning-btn', 'outline-btn');
                btn.style.borderColor = 'var(--success)';
                btn.style.color = 'var(--success)';
                return;
            }
            const p = document.createElement('div');
            p.style.marginBottom = '0.5rem';
            if(currentStep === 0) p.style.color = 'var(--danger)';
            else if(currentStep === steps.length - 1) p.style.color = 'var(--success)';
            p.innerText = "> " + steps[currentStep];
            workflowEl.appendChild(p);
            currentStep++;
            setTimeout(runStep, 1500);
        };
        
        setTimeout(runStep, 500);
    },

    // --- Resume Timeline ---
    showTimelineDetail: function(stage, el) {
        document.querySelectorAll('.timeline-item').forEach(item => item.classList.remove('active'));
        if(el) el.classList.add('active');

        const detailEl = document.getElementById('timeline-detail');
        detailEl.classList.remove('hidden');
        
        const data = {
            'linux': "<strong>Linux & Virtualization:</strong> Started career focusing on deep Linux administration (CentOS, Ubuntu, Debian). Managed KVM virtualization environments, configured networking, firewalls (iptables/ufw), and web servers (Nginx, Apache).",
            'infra': "<strong>Infrastructure Engineering:</strong> Transitioned to managing large-scale infrastructure for ISPs and IPTV platforms. Handled DNS, databases (MariaDB), storage, and automated configurations.",
            'containers': "<strong>Containers & Kubernetes:</strong> Embraced modern cloud-native architectures. Migrated legacy workloads to Docker containers. Designed and deployed highly available Kubernetes clusters using RKE2 and K3s.",
            'devops': "<strong>Senior DevOps & Observability:</strong> Built complete end-to-end CI/CD pipelines with GitLab. Implemented Infrastructure as Code using Terraform/Ansible. Setup comprehensive monitoring and alerting using Prometheus and Grafana. Focus on SRE practices."
        };
        
        detailEl.innerHTML = data[stage];
    }
};

document.addEventListener('DOMContentLoaded', () => {
    appState.initTerminal();
});
