export interface IncidentResult {
    result: Result[];
}

export interface Result {
    parent:                   string;
    made_sla:                 string;
    caused_by:                string;
    watch_list:               string;
    upon_reject:              UponReject;
    sys_updated_on:           Date;
    child_incidents:          string;
    hold_reason:              string;
    origin_table:             string;
    task_effective_number:    string;
    approval_history:         string;
    number:                   string;
    resolved_by:              CallerID;
    sys_updated_by:           SysUpdatedBy;
    opened_by:                CallerID;
    user_input:               string;
    sys_created_on:           Date;
    sys_domain:               CallerID;
    state:                    string;
    route_reason:             string;
    sys_created_by:           string;
    knowledge:                string;
    order:                    string;
    calendar_stc:             string;
    closed_at:                Date;
    cmdb_ci:                  CallerID | string;
    delivery_plan:            string;
    contract:                 string;
    impact:                   string;
    active:                   string;
    work_notes_list:          string;
    business_service:         CallerID | string;
    business_impact:          string;
    priority:                 string;
    sys_domain_path:          SysDomainPath;
    rfc:                      string;
    time_worked:              string;
    expected_start:           string;
    opened_at:                Date;
    business_duration:        Date;
    group_list:               string;
    work_end:                 string;
    caller_id:                CallerID;
    reopened_time:            string;
    resolved_at:              Date;
    approval_set:             string;
    subcategory:              Subcategory;
    work_notes:               string;
    universal_request:        string;
    short_description:        string;
    close_code:               CloseCode;
    correlation_display:      string;
    delivery_task:            string;
    work_start:               string;
    assignment_group:         CallerID | string;
    additional_assignee_list: string;
    business_stc:             string;
    cause:                    string;
    description:              string;
    origin_id:                string;
    calendar_duration:        Date;
    close_notes:              string;
    notify:                   string;
    service_offering:         string;
    sys_class_name:           SysClassName;
    closed_by:                CallerID;
    follow_up:                string;
    parent_incident:          string;
    sys_id:                   string;
    contact_type:             ContactType;
    reopened_by:              string;
    incident_state:           string;
    urgency:                  string;
    problem_id:               string;
    company:                  CallerID | string;
    reassignment_count:       string;
    activity_due:             string;
    assigned_to:              CallerID | string;
    severity:                 string;
    comments:                 string;
    approval:                 Approval;
    sla_due:                  string;
    comments_and_work_notes:  string;
    due_date:                 string;
    sys_mod_count:            string;
    reopen_count:             string;
    sys_tags:                 string;
    escalation:               string;
    upon_approval:            UponApproval;
    correlation_id:           string;
    location:                 CallerID | string;
    category:                 string;
}

export enum Approval {
    NotRequested = "not requested",
}

export interface CallerID {
    link:  string;
    value: string;
}

export enum CloseCode {
    ClosedResolvedByCaller = "Closed/Resolved by Caller",
    SolvedPermanently = "Solved (Permanently)",
    SolvedWorkAround = "Solved (Work Around)",
}

export enum ContactType {
    Empty = "",
    Phone = "phone",
    SelfService = "self-service",
}

export enum Subcategory {
    Email = "email",
    Empty = "",
}

export enum SysClassName {
    Incident = "incident",
}

export enum SysDomainPath {
    Empty = "/",
}

export enum SysUpdatedBy {
    Admin = "admin",
    Employee = "employee",
    System = "system",
}

export enum UponApproval {
    Empty = "",
    Proceed = "proceed",
}

export enum UponReject {
    Cancel = "cancel",
    Empty = "",
}