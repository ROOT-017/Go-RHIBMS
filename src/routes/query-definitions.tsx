export const queryNames = {
    SELECTED_VIEW: "selectedView",
    SELECTED_ISSUE: "selectedIssue",
    ACTION: "action",
    FILTER: "filter",
    PERDIEM_VIEW: "perdiemView",
    TAB: "tab",
    WORKSPACE: "workspace",
    TEMPLATE: "template",
    JOB: "job"
} as const;
export const queryDict = {
    Settings: {
        [queryNames.SELECTED_VIEW]: "settings",
        [queryNames.SELECTED_ISSUE]: {
            MedicalCenters: "medical-centers",
            Accounts: "accounts",
            BillManagement: "bill-management"
        },
        [queryNames.ACTION]: {
            AddBillingGroup: "AddBillingGroup",
            AddMedicalCenter: "AddMedicalCenter"
        }
    },
    PerDiemJobs: {
        [queryNames.SELECTED_VIEW]: "perdiem",
        [queryNames.WORKSPACE]: {
            PostFromTemplate: "post-from-template",
            Post: "post",
            Preview: 'preview'
        },
        [queryNames.ACTION]: {
            CreateNew: "CreateNew",
            Select: "Select",
            List: "List",
            Edit: "Edit"
        }
    },
    AssignmentJobs: {
        [queryNames.SELECTED_VIEW]: "assignments",
        [queryNames.WORKSPACE]: {
            PostFromTemplate: "post-from-template",
            Post: "post",
            Preview: 'preview'
        },
        [queryNames.ACTION]: {
            CreateNew: "CreateNew",
            Select: "Select",
            List: "List"
        }
    },
    Default: {
        [queryNames.WORKSPACE]: {
            PostFromTemplate: "post-from-template",
            Post: "post",
            Preview: 'preview'
        },
        [queryNames.ACTION]: {
            CreateNew: "CreateNew",
            Select: "Select",
            List: "List",
            Edit: "Edit"
        }
    }
} as const;
